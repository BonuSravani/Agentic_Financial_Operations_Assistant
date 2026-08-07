package com.finops.agent.repository;

import com.finops.agent.model.FraudRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FraudRecordRepository extends JpaRepository<FraudRecord, Long> {
    Optional<FraudRecord> findByCustomerId(String customerId);
}
