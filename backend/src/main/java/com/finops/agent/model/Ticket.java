package com.finops.agent.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticketId;       // e.g. TCK-8042
    private String customerName;   // e.g. Ananya Sharma
    private String customerId;     // e.g. CUST-9921
    private String category;       // PAYMENTS, SUPPORT, FRAUD, INTERNAL_OPS
    
    @Column(length = 2000)
    private String issueDescription; // Customer complaint/transcript

    private Double amount;         // Amount involved (INR)
    private String currency;       // INR

    private String status;         // PENDING, PROCESSING, AUTO_RESOLVED, AWAITING_APPROVAL, APPROVED, REJECTED
    private String riskLevel;      // LOW, MEDIUM, HIGH, CRITICAL

    private Double riskScore;      // 0.0 to 100.0
    private String actionProposed; // e.g. Refund INR 450, Hold Account, Request Verification

    // Dual-Party Cross Matching Fields
    private String txnId;               // e.g. TXN-1002
    private String linkedTicketId;     // ID of opposing party's ticket if matched
    private String crossMatchStatus;   // NONE, SINGLE_PARTY_HOLD, DUAL_MATCHED_DISPUTE

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    public Ticket() {}

    public Ticket(Long id, String ticketId, String customerName, String customerId, String category, 
                  String issueDescription, Double amount, String currency, String status, 
                  String riskLevel, Double riskScore, String actionProposed, String txnId, 
                  String linkedTicketId, String crossMatchStatus, 
                  LocalDateTime createdAt, LocalDateTime resolvedAt) {
        this.id = id;
        this.ticketId = ticketId;
        this.customerName = customerName;
        this.customerId = customerId;
        this.category = category;
        this.issueDescription = issueDescription;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.riskLevel = riskLevel;
        this.riskScore = riskScore;
        this.actionProposed = actionProposed;
        this.txnId = txnId;
        this.linkedTicketId = linkedTicketId;
        this.crossMatchStatus = crossMatchStatus;
        this.createdAt = createdAt;
        this.resolvedAt = resolvedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIssueDescription() { return issueDescription; }
    public void setIssueDescription(String issueDescription) { this.issueDescription = issueDescription; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }

    public String getActionProposed() { return actionProposed; }
    public void setActionProposed(String actionProposed) { this.actionProposed = actionProposed; }

    public String getTxnId() { return txnId; }
    public void setTxnId(String txnId) { this.txnId = txnId; }

    public String getLinkedTicketId() { return linkedTicketId; }
    public void setLinkedTicketId(String linkedTicketId) { this.linkedTicketId = linkedTicketId; }

    public String getCrossMatchStatus() { return crossMatchStatus; }
    public void setCrossMatchStatus(String crossMatchStatus) { this.crossMatchStatus = crossMatchStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
