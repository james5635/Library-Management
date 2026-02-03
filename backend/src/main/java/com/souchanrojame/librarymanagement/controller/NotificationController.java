package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Notification;
import com.souchanrojame.librarymanagement.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    private final NotificationRepository notificationRepository;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @GetMapping("/user/{email}")
    public List<Notification> getNotificationsByUser(@PathVariable String email) {
        return notificationRepository.findByReaderEmailOrderByTimestampDesc(email);
    }

    @PatchMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new java.util.NoSuchElementException("Notification not found with ID: " + id));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        if (notification.getTimestamp() == null) {
            notification.setTimestamp(java.time.LocalDateTime.now());
        }
        return notificationRepository.save(notification);
    }
}
