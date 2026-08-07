package com.finops.agent.controller;

import com.finops.agent.model.AuditLog;
import com.finops.agent.model.Ticket;
import com.finops.agent.repository.AuditLogRepository;
import com.finops.agent.repository.TicketRepository;
import com.finops.agent.service.MockEnterpriseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/approvals")
@CrossOrigin(origins = "*")
public class ApprovalController {

    private final TicketRepository ticketRepository;
    private final AuditLogRepository auditLogRepository;
    private final MockEnterpriseService enterpriseService;

    public ApprovalController(TicketRepository ticketRepository, AuditLogRepository auditLogRepository, MockEnterpriseService enterpriseService) {
        this.ticketRepository = ticketRepository;
        this.auditLogRepository = auditLogRepository;
        this.enterpriseService = enterpriseService;
    }

    @GetMapping("/pending")
    public List<Ticket> getPendingApprovals() {
        return ticketRepository.findByStatus("AWAITING_APPROVAL");
    }

    @PostMapping("/respond")
    public Ticket respondApproval(@RequestBody Map<String, String> request) {
        String ticketId = request.get("ticketId");
        String decision = request.get("decision"); // APPROVED or REJECTED
        String managerNotes = request.getOrDefault("notes", "No notes provided");

        Ticket ticket = ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        if ("APPROVED".equalsIgnoreCase(decision)) {
            ticket.setStatus("APPROVED");
            ticket.setResolvedAt(LocalDateTime.now());

            if (ticket.getActionProposed().toLowerCase().contains("refund")) {
                enterpriseService.executeRefund(ticket.getCustomerId(), ticket.getAmount());
            } else if (ticket.getActionProposed().toLowerCase().contains("freeze") || ticket.getActionProposed().toLowerCase().contains("hold")) {
                enterpriseService.executeAccountHold(ticket.getCustomerId(), managerNotes);
            }

            AuditLog log = new AuditLog(null, ticketId, "HumanManager", "MANAGER_APPROVED",
                    "Manager APPROVED proposed action: [" + ticket.getActionProposed() + "]. Notes: " + managerNotes, 0.0, LocalDateTime.now());
            auditLogRepository.save(log);

        } else {
            ticket.setStatus("REJECTED");
            ticket.setResolvedAt(LocalDateTime.now());

            AuditLog log = new AuditLog(null, ticketId, "HumanManager", "MANAGER_REJECTED",
                    "Manager REJECTED proposed action: [" + ticket.getActionProposed() + "]. Reason: " + managerNotes, 0.0, LocalDateTime.now());
            auditLogRepository.save(log);
        }

        return ticketRepository.save(ticket);
    }
}
