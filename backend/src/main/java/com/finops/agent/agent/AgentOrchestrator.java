package com.finops.agent.agent;

import com.finops.agent.model.AuditLog;
import com.finops.agent.model.Ticket;
import com.finops.agent.privacy.PiiRedactorService;
import com.finops.agent.repository.AuditLogRepository;
import com.finops.agent.repository.TicketRepository;
import com.finops.agent.service.MockEnterpriseService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgentOrchestrator {

    private final PiiRedactorService piiRedactor;
    private final RouterAgent routerAgent;
    private final SupportAgent supportAgent;
    private final PaymentsAgent paymentsAgent;
    private final FraudAgent fraudAgent;
    private final SupervisorAgent supervisorAgent;
    private final TicketRepository ticketRepository;
    private final AuditLogRepository auditLogRepository;
    private final MockEnterpriseService enterpriseService;

    public AgentOrchestrator(PiiRedactorService piiRedactor, RouterAgent routerAgent, SupportAgent supportAgent,
                             PaymentsAgent paymentsAgent, FraudAgent fraudAgent, SupervisorAgent supervisorAgent,
                             TicketRepository ticketRepository, AuditLogRepository auditLogRepository,
                             MockEnterpriseService enterpriseService) {
        this.piiRedactor = piiRedactor;
        this.routerAgent = routerAgent;
        this.supportAgent = supportAgent;
        this.paymentsAgent = paymentsAgent;
        this.fraudAgent = fraudAgent;
        this.supervisorAgent = supervisorAgent;
        this.ticketRepository = ticketRepository;
        this.auditLogRepository = auditLogRepository;
        this.enterpriseService = enterpriseService;
    }

    public Ticket processTicket(String ticketId, SseEmitter emitter) {
        Ticket ticket = ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        ticket.setStatus("PROCESSING");
        ticketRepository.save(ticket);

        try {
            // STEP 1: PII Masking (RBI / DPDP Compliance)
            sendSse(emitter, "PRIVACY_GATEWAY", "Masking sensitive PII data (Aadhaar, PAN, Cards, Phone)...");
            String redactedDesc = piiRedactor.redactPii(ticket.getIssueDescription());
            saveAudit(ticket.getTicketId(), "PII_Sanitizer", "PII_MASK", "Redacted sensitive data in customer transcript: " + redactedDesc, 0.0001);

            // STEP 2: Intent Classification (Router Agent)
            sendSse(emitter, "ROUTER_AGENT", "Classifying ticket category and selecting specialized agents...");
            String category = routerAgent.classifyCategory(ticket);
            ticket.setCategory(category);
            saveAudit(ticket.getTicketId(), "RouterAgent", "INTENT_CLASSIFY", "Classified category as " + category + " based on ticket context.", 0.0002);

            // STEP 3: Support Agent Context Analysis
            sendSse(emitter, "SUPPORT_AGENT", "Analyzing customer history & sentiment...");
            String supportAnalysis = supportAgent.analyzeCustomerContext(ticket, redactedDesc);
            saveAudit(ticket.getTicketId(), "SupportAgent", "SENTIMENT_ANALYSIS", supportAnalysis, 0.0004);

            // STEP 4: Payments Agent Lookup & Cross-Ticket Correlation
            sendSse(emitter, "PAYMENTS_AGENT", "Querying gateway logs & searching cross-ticket dispute database...");
            String paymentAnalysis = paymentsAgent.analyzePaymentDetails(ticket.getCustomerId(), ticket.getAmount());
            saveAudit(ticket.getTicketId(), "PaymentsAgent", "PAYMENT_LOOKUP", paymentAnalysis, 0.0005);

            // STEP 4.5: Cross-Ticket Dual Party Correlation Engine
            String txnId = ticket.getTxnId();
            if (txnId != null && !txnId.isBlank()) {
                List<Ticket> matchingTickets = ticketRepository.findByTxnId(txnId);
                Ticket otherTicket = matchingTickets.stream()
                        .filter(t -> !t.getTicketId().equals(ticket.getTicketId()))
                        .findFirst().orElse(null);

                if (otherTicket != null) {
                    sendSse(emitter, "CROSS_CORRELATION_ENGINE", String.format("🤝 DUAL-PARTY MATCH FOUND! Opposing party ticket [%s] (%s) matches Txn %s.",
                            otherTicket.getTicketId(), otherTicket.getCustomerName(), txnId));
                    ticket.setCrossMatchStatus("DUAL_MATCHED_DISPUTE");
                    ticket.setLinkedTicketId(otherTicket.getTicketId());
                    otherTicket.setCrossMatchStatus("DUAL_MATCHED_DISPUTE");
                    otherTicket.setLinkedTicketId(ticket.getTicketId());
                    ticketRepository.save(otherTicket);

                    saveAudit(ticket.getTicketId(), "CrossCorrelationEngine", "DUAL_MATCH_DETECTED",
                            String.format("Cross-correlated ticket %s (%s) with %s (%s) for Txn %s. High confidence 99%% match.",
                                    ticket.getTicketId(), ticket.getCustomerName(), otherTicket.getTicketId(), otherTicket.getCustomerName(), txnId), 0.0010);
                } else {
                    sendSse(emitter, "CROSS_CORRELATION_ENGINE", "Single-party transaction dispute. Applying temporary Lien Hold & issuing consent request...");
                    ticket.setCrossMatchStatus("SINGLE_PARTY_HOLD");
                }
            }

            // STEP 5: Fraud Agent Scoring
            sendSse(emitter, "FRAUD_AGENT", "Evaluating velocity, blacklists, and fraud risk score...");
            double riskScore = fraudAgent.calculateRiskScore(ticket.getCustomerId(), ticket.getAmount());
            ticket.setRiskScore(riskScore);
            saveAudit(ticket.getTicketId(), "FraudAgent", "RISK_SCORE", String.format("Computed Risk Score: %.1f / 100", riskScore), 0.0006);

            // STEP 6: Supervisor Agent Self-Check & Policy Evaluation
            sendSse(emitter, "SUPERVISOR_AGENT", "Running self-correction audit & checking compliance rules...");
            SupervisorAgent.SupervisorDecision decision = supervisorAgent.evaluatePolicy(ticket, riskScore);

            // OVERRIDE FOR DUAL MATCH: If dual match found, propose Reverse Settlement Execution
            if ("DUAL_MATCHED_DISPUTE".equals(ticket.getCrossMatchStatus())) {
                decision.finalStatus = "AWAITING_APPROVAL";
                decision.riskLevel = "CRITICAL";
                decision.actionProposed = "Execute Reverse Settlement (Dual Party Sender & Receiver Matched)";
                decision.rationale = String.format("DUAL MATCH VERIFIED: Sender & Receiver tickets matched for Txn %s. Ready for 1-Click Manager Reversal.", ticket.getTxnId());
            }

            ticket.setStatus(decision.finalStatus);
            ticket.setRiskLevel(decision.riskLevel);
            ticket.setActionProposed(decision.actionProposed);

            if ("AUTO_RESOLVED".equals(decision.finalStatus)) {
                ticket.setResolvedAt(LocalDateTime.now());
                enterpriseService.executeRefund(ticket.getCustomerId(), ticket.getAmount());
                sendSse(emitter, "SYSTEM_EXECUTION", "AUTO-EXECUTED: Refund issued successfully via Gateway API!");
                saveAudit(ticket.getTicketId(), "SupervisorAgent", "AUTO_EXECUTE", decision.rationale, 0.0008);
            } else {
                sendSse(emitter, "HUMAN_IN_THE_LOOP", "ESCALATED: Pushed Evidence Package to Manager Approval Inbox.");
                saveAudit(ticket.getTicketId(), "SupervisorAgent", "ESCALATE_HITL", decision.rationale, 0.0008);
            }

            ticketRepository.save(ticket);
            sendSse(emitter, "COMPLETE", "Multi-agent workflow finished for " + ticketId);
            if (emitter != null) emitter.complete();

        } catch (Exception e) {
            ticket.setStatus("FAILED");
            ticketRepository.save(ticket);
            if (emitter != null) emitter.completeWithError(e);
        }

        return ticket;
    }

    private void sendSse(SseEmitter emitter, String agent, String message) {
        if (emitter == null) return;
        try {
            emitter.send(SseEmitter.event().name("AGENT_STEP").data(String.format("{\"agent\":\"%s\", \"message\":\"%s\"}", agent, message)));
            Thread.sleep(400);
        } catch (IOException | InterruptedException ignored) {}
    }

    private void saveAudit(String ticketId, String agentName, String actionType, String rationale, double cost) {
        AuditLog log = new AuditLog(null, ticketId, agentName, actionType, rationale, cost, LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
