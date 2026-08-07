package com.finops.agent.agent;

import com.finops.agent.model.Ticket;
import org.springframework.stereotype.Component;

@Component
public class RouterAgent {

    public String classifyCategory(Ticket ticket) {
        String desc = ticket.getIssueDescription() != null ? ticket.getIssueDescription().toUpperCase() : "";
        
        if (desc.contains("FRAUD") || desc.contains("SUSPICIOUS") || desc.contains("STOLEN") || 
            desc.contains("UNAUTHORIZED") || desc.contains("ANOTHER ACCOUNT") || desc.contains("UNKNOWINGLY") || desc.contains("UNKNOWN")) {
            return "FRAUD";
        } else if (desc.contains("REFUND") || desc.contains("FAILED") || desc.contains("DEDUCTED") || desc.contains("GATEWAY")) {
            return "PAYMENTS";
        } else if (desc.contains("APPROVE") || desc.contains("LIMIT") || desc.contains("ACCESS")) {
            return "INTERNAL_OPS";
        }
        return "SUPPORT";
    }
}
