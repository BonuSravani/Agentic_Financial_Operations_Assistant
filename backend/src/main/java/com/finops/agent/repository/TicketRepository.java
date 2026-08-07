package com.finops.agent.repository;

import com.finops.agent.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketId(String ticketId);
    List<Ticket> findByStatus(String status);
    List<Ticket> findByTxnId(String txnId);
    List<Ticket> findAllByOrderByCreatedAtDesc();
}
