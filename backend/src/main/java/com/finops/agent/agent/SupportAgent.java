package com.finops.agent.agent;

import com.finops.agent.model.Ticket;
import org.springframework.stereotype.Component;

@Component
public class SupportAgent {

    public String analyzeCustomerContext(Ticket ticket, String sanitizedDescription) {
        double amount = ticket.getAmount() != null ? ticket.getAmount() : 0.0;
        String tier = amount > 10000 ? "VIP Gold" : "Standard Customer";
        
        boolean urgent = sanitizedDescription.toLowerCase().contains("urgent") || 
                         sanitizedDescription.toLowerCase().contains("immediately");

        return String.format("Customer Tier: %s | Tone: %s | Summary: Issue regarding INR %.2f.",
                tier, urgent ? "HIGH ANXIETY" : "NEUTRAL/INFORMATIONAL", amount);
    }
}
