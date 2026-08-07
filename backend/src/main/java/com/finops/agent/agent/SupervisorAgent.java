package com.finops.agent.agent;

import com.finops.agent.model.Ticket;
import org.springframework.stereotype.Component;

@Component
public class SupervisorAgent {

    public static class SupervisorDecision {
        public String finalStatus; // AUTO_RESOLVED or AWAITING_APPROVAL
        public String riskLevel;   // LOW, MEDIUM, HIGH, CRITICAL
        public String actionProposed;
        public String rationale;

        public SupervisorDecision(String finalStatus, String riskLevel, String actionProposed, String rationale) {
            this.finalStatus = finalStatus;
            this.riskLevel = riskLevel;
            this.actionProposed = actionProposed;
            this.rationale = rationale;
        }
    }

    public SupervisorDecision evaluatePolicy(Ticket ticket, double riskScore) {
        double amount = ticket.getAmount() != null ? ticket.getAmount() : 0.0;
        String desc = ticket.getIssueDescription() != null ? ticket.getIssueDescription().toLowerCase() : "";

        // Check for suspicious fraud keywords
        boolean isSuspicious = desc.contains("unknowingly") || desc.contains("unknown") || 
                              desc.contains("another account") || desc.contains("unauthorized") || 
                              desc.contains("stolen") || desc.contains("hacked");

        if (isSuspicious) {
            riskScore = Math.max(riskScore, 75.0); // Boost to Critical Risk
        }

        String riskLevel = "LOW";
        if (riskScore >= 75) riskLevel = "CRITICAL";
        else if (riskScore >= 50) riskLevel = "HIGH";
        else if (riskScore >= 30) riskLevel = "MEDIUM";

        // GUARDRAIL RULE 1: ANY amount exceeding INR 5,000 requires Human Manager Approval (Regardless of Category)
        if (amount > 5000.0) {
            return new SupervisorDecision(
                "AWAITING_APPROVAL",
                riskLevel,
                String.format("Manager Review Required for INR %.2f", amount),
                String.format("HIGH-RISK THRESHOLD BREACHED: Amount (INR %.2f) exceeds safety limit (INR 5,000). Risk score: %.1f/100. Pushed to Human Manager Inbox.", amount, riskScore)
            );
        }

        // GUARDRAIL RULE 2: High Risk / Fraud Suspicions require Manager Approval
        if (riskScore >= 50.0 || isSuspicious || "FRAUD".equalsIgnoreCase(ticket.getCategory())) {
            return new SupervisorDecision(
                "AWAITING_APPROVAL",
                riskLevel,
                "Investigate Suspicious Fund Transfer & Hold Account",
                String.format("SUSPICIOUS TRANSFER DETECTED: Keywords ('another account / unknown') flagged. Risk score: %.1f/100. Scaled for Manager Review.", riskScore)
            );
        }

        // SAFE ACTION: Auto-Execute Refund for low-risk small amounts (< ₹5,000)
        return new SupervisorDecision(
            "AUTO_RESOLVED",
            riskLevel,
            String.format("Auto-Execute Refund of INR %.2f", amount),
            String.format("POLICY VERIFIED: Amount (INR %.2f) is under safety limit (INR 5,000) and risk score is low (%.1f/100). Auto-executing refund via gateway API.", amount, riskScore)
        );
    }
}
