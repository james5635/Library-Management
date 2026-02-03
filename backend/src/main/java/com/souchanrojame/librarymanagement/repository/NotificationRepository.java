package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReaderEmailOrderByTimestampDesc(String email);
    List<Notification> findByIsReadFalse();
}
