package com.finops.agent.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_records")
public class FraudRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerId;
    private Boolean isBlacklisted;
    private Integer previousDisputesCount;
    private Double riskScore;        // 0-100
    private String riskFlags;       // e.g. "IP_MISMATCH, HIGH_VELOCITY"
    private LocalDateTime lastReported;

    public FraudRecord() {}

    public FraudRecord(Long id, String customerId, Boolean isBlacklisted, Integer previousDisputesCount, Double riskScore, String riskFlags, LocalDateTime lastReported) {
        this.id = id;
        this.customerId = customerId;
        this.isBlacklisted = isBlacklisted;
        this.previousDisputesCount = previousDisputesCount;
        this.riskScore = riskScore;
        this.riskFlags = riskFlags;
        this.lastReported = lastReported;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public Boolean getIsBlacklisted() { return isBlacklisted; }
    public void setIsBlacklisted(Boolean isBlacklisted) { this.isBlacklisted = isBlacklisted; }

    public Integer getPreviousDisputesCount() { return previousDisputesCount; }
    public void setPreviousDisputesCount(Integer previousDisputesCount) { this.previousDisputesCount = previousDisputesCount; }

    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }

    public String getRiskFlags() { return riskFlags; }
    public void setRiskFlags(String riskFlags) { this.riskFlags = riskFlags; }

    public LocalDateTime getLastReported() { return lastReported; }
    public void setLastReported(LocalDateTime lastReported) { this.lastReported = lastReported; }
}
