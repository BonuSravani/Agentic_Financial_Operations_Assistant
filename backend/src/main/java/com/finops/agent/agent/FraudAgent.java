package com.finops.agent.agent;

import com.finops.agent.model.FraudRecord;
import com.finops.agent.service.MockEnterpriseService;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class FraudAgent {

    private final MockEnterpriseService enterpriseService;

    public FraudAgent(MockEnterpriseService enterpriseService) {
        this.enterpriseService = enterpriseService;
    }

    public double calculateRiskScore(String customerId, Double amount) {
        Optional<FraudRecord> fraudOpt = enterpriseService.lookupFraudHistory(customerId);
        double baseScore = 15.0; // Low base risk

        if (fraudOpt.isPresent()) {
            FraudRecord fr = fraudOpt.get();
            if (Boolean.TRUE.equals(fr.getIsBlacklisted())) {
                baseScore += 70.0;
            }
            if (fr.getPreviousDisputesCount() != null && fr.getPreviousDisputesCount() > 2) {
                baseScore += 25.0;
            }
        }

        // Amount based risk multiplier
        if (amount != null && amount > 5000) {
            baseScore += 30.0;
        }

        return Math.min(100.0, baseScore);
    }
}
