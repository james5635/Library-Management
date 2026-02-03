package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.DigitalAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DigitalAccessLogRepository extends JpaRepository<DigitalAccessLog, Integer> {
}
