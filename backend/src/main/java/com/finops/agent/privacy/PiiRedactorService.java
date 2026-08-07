package com.finops.agent.privacy;

import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
public class PiiRedactorService {

    // Regex Patterns for Indian Financial & Personal Data
    private static final Pattern AADHAAR_PATTERN = Pattern.compile("\\b[2-9]{1}[0-9]{3}[\\s-]?[0-9]{4}[\\s-]?[0-9]{4}\\b");
    private static final Pattern PAN_PATTERN = Pattern.compile("\\b[A-Z]{5}[0-9]{4}[A-Z]{1}\\b");
    private static final Pattern CARD_PATTERN = Pattern.compile("\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\\b");
    private static final Pattern PHONE_PATTERN = Pattern.compile("\\b(?:\\+91[\\-\\s]?)?[6-9]\\d{9}\\b");
    private static final Pattern UPI_PATTERN = Pattern.compile("[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z]{2,64}");

    public String redactPii(String text) {
        if (text == null || text.isBlank()) return text;

        String sanitized = text;

        // Mask Aadhaar: e.g. "2345 6789 0123" -> "[AADHAAR: XXXX-XXXX-0123]"
        sanitized = AADHAAR_PATTERN.matcher(sanitized).replaceAll(match -> {
            String val = match.group().replaceAll("[\\s-]", "");
            return "[AADHAAR: XXXX-XXXX-" + val.substring(val.length() - 4) + "]";
        });

        // Mask PAN: e.g. "ABCDE1234F" -> "[PAN: ABCDE****F]"
        sanitized = PAN_PATTERN.matcher(sanitized).replaceAll(match -> {
            String val = match.group();
            return "[PAN: " + val.substring(0, 3) + "****" + val.charAt(val.length() - 1) + "]";
        });

        // Mask Card: e.g. "4111222233334444" -> "[CARD: 4111-XXXX-XXXX-4444]"
        sanitized = CARD_PATTERN.matcher(sanitized).replaceAll(match -> {
            String val = match.group();
            return "[CARD: " + val.substring(0, 4) + "-XXXX-XXXX-" + val.substring(val.length() - 4) + "]";
        });

        // Mask Phone: e.g. "+91 9876543210" -> "[PHONE: +91-XXXXXX3210]"
        sanitized = PHONE_PATTERN.matcher(sanitized).replaceAll(match -> {
            String val = match.group().replaceAll("[\\s-]", "");
            String suffix = val.length() >= 4 ? val.substring(val.length() - 4) : val;
            return "[PHONE: +91-XXXXXX" + suffix + "]";
        });

        // Mask UPI ID: e.g. "ananya.sharma@okaxis" -> "[UPI: ananya****@okaxis]"
        sanitized = UPI_PATTERN.matcher(sanitized).replaceAll(match -> {
            String val = match.group();
            int atIdx = val.indexOf('@');
            if (atIdx > 2) {
                return "[UPI: " + val.substring(0, 2) + "****" + val.substring(atIdx) + "]";
            }
            return "[UPI: ****" + val.substring(atIdx) + "]";
        });

        return sanitized;
    }
}
