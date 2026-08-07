package com.finops.agent.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String txnId;         // TXN-99823
    private String customerId;    // CUST-9921
    private Double amount;
    private String status;        // SUCCESS, FAILED, PENDING, DISPUTED
    private String failureCode;   // GATEWAY_TIMEOUT, INSUFFICIENT_FUNDS, CARD_EXPIRED, NETWORK_ERROR
    private String gateway;       // RAZORPAY, STRIPE, PAYTM
    private LocalDateTime timestamp;

    public Transaction() {}

    public Transaction(Long id, String txnId, String customerId, Double amount, String status, String failureCode, String gateway, LocalDateTime timestamp) {
        this.id = id;
        this.txnId = txnId;
        this.customerId = customerId;
        this.amount = amount;
        this.status = status;
        this.failureCode = failureCode;
        this.gateway = gateway;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTxnId() { return txnId; }
    public void setTxnId(String txnId) { this.txnId = txnId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFailureCode() { return failureCode; }
    public void setFailureCode(String failureCode) { this.failureCode = failureCode; }

    public String getGateway() { return gateway; }
    public void setGateway(String gateway) { this.gateway = gateway; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
