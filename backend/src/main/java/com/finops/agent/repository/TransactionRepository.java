package com.finops.agent.repository;

import com.finops.agent.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByTxnId(String txnId);
    List<Transaction> findByCustomerId(String customerId);
}
