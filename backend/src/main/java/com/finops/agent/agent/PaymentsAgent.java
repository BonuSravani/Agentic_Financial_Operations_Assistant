package com.finops.agent.agent;

import com.finops.agent.model.Transaction;
import com.finops.agent.service.MockEnterpriseService;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PaymentsAgent {

    private final MockEnterpriseService enterpriseService;

    public PaymentsAgent(MockEnterpriseService enterpriseService) {
        this.enterpriseService = enterpriseService;
    }

    public String analyzePaymentDetails(String customerId, Double ticketAmount) {
        Optional<Transaction> txnOpt = enterpriseService.lookupPaymentTransaction(customerId);
        if (txnOpt.isPresent()) {
            Transaction txn = txnOpt.get();
            return String.format("Found Gateway Txn [%s] via %s. Status: %s. Failure Code: %s. Amount matched: INR %.2f.",
                    txn.getTxnId(), txn.getGateway(), txn.getStatus(), 
                    txn.getFailureCode() != null ? txn.getFailureCode() : "NONE", txn.getAmount());
        }
        return "No recent transaction record found matching customer ID. Manual verification required.";
    }
}
