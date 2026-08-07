package com.finops.agent.service;

import com.finops.agent.model.FraudRecord;
import com.finops.agent.model.Transaction;
import com.finops.agent.repository.FraudRecordRepository;
import com.finops.agent.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MockEnterpriseService {

    private final TransactionRepository transactionRepository;
    private final FraudRecordRepository fraudRecordRepository;

    public MockEnterpriseService(TransactionRepository transactionRepository, FraudRecordRepository fraudRecordRepository) {
        this.transactionRepository = transactionRepository;
        this.fraudRecordRepository = fraudRecordRepository;
    }

    public Optional<Transaction> lookupPaymentTransaction(String customerId) {
        return transactionRepository.findByCustomerId(customerId).stream().findFirst();
    }

    public Optional<FraudRecord> lookupFraudHistory(String customerId) {
        return fraudRecordRepository.findByCustomerId(customerId);
    }

    public boolean executeRefund(String txnId, Double amount) {
        // Simulates Razorpay/Stripe Refund API call
        Optional<Transaction> txn = transactionRepository.findByTxnId(txnId);
        if (txn.isPresent()) {
            Transaction t = txn.get();
            t.setStatus("REFUNDED");
            transactionRepository.save(t);
            return true;
        }
        return false;
    }

    public boolean executeAccountHold(String customerId, String reason) {
        Optional<FraudRecord> fr = fraudRecordRepository.findByCustomerId(customerId);
        if (fr.isPresent()) {
            FraudRecord f = fr.get();
            f.setIsBlacklisted(true);
            f.setRiskFlags(f.getRiskFlags() + ", HOLD_APPLIED: " + reason);
            fraudRecordRepository.save(f);
            return true;
        }
        return false;
    }
}
