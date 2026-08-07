package com.finops.agent.controller;

import com.finops.agent.agent.AgentOrchestrator;
import com.finops.agent.model.Ticket;
import com.finops.agent.repository.TicketRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketRepository ticketRepository;
    private final AgentOrchestrator orchestrator;

    public TicketController(TicketRepository ticketRepository, AgentOrchestrator orchestrator) {
        this.ticketRepository = ticketRepository;
        this.orchestrator = orchestrator;
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/{ticketId}")
    public Ticket getTicket(@PathVariable String ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket request) {
        String newId = "TCK-" + (1000 + new Random().nextInt(9000));
        request.setTicketId(newId);
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        if (request.getRiskScore() == null) request.setRiskScore(15.0);
        if (request.getRiskLevel() == null) request.setRiskLevel("LOW");
        if (request.getCurrency() == null) request.setCurrency("INR");
        if (request.getActionProposed() == null) request.setActionProposed("Pending Routing");
        return ticketRepository.save(request);
    }

    @PostMapping("/process/{ticketId}")
    public Ticket processTicketSync(@PathVariable String ticketId) {
        return orchestrator.processTicket(ticketId, null);
    }

    @GetMapping(value = "/stream/{ticketId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter processTicketStream(@PathVariable String ticketId) {
        SseEmitter emitter = new SseEmitter(180000L); // 3-minute timeout
        new Thread(() -> orchestrator.processTicket(ticketId, emitter)).start();
        return emitter;
    }
}
