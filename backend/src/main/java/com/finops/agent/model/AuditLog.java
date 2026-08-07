package com.finops.agent.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticketId;
    private String agentName;       // RouterAgent, SupportAgent, PaymentsAgent, FraudAgent, SupervisorAgent
    private String actionType;      // READ_SYSTEM, CALCULATE_SCORE, AUTO_EXECUTE, ESCALATE_HITL, MANAGER_APPROVED, MANAGER_REJECTED
    
    @Column(length = 2000)
    private String plainLanguageRationale;

    private Double estimatedCostUsd; // Cost per decision step (e.g., $0.0004)
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(Long id, String ticketId, String agentName, String actionType, String plainLanguageRationale, Double estimatedCostUsd, LocalDateTime timestamp) {
        this.id = id;
        this.ticketId = ticketId;
        this.agentName = agentName;
        this.actionType = actionType;
        this.plainLanguageRationale = plainLanguageRationale;
        this.estimatedCostUsd = estimatedCostUsd;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getAgentName() { return agentName; }
    public void setAgentName(String agentName) { this.agentName = agentName; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getPlainLanguageRationale() { return plainLanguageRationale; }
    public void setPlainLanguageRationale(String plainLanguageRationale) { this.plainLanguageRationale = plainLanguageRationale; }

    public Double getEstimatedCostUsd() { return estimatedCostUsd; }
    public void setEstimatedCostUsd(Double estimatedCostUsd) { this.estimatedCostUsd = estimatedCostUsd; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
