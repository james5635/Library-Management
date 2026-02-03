package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DigitalAccessLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DigitalAccessLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accessId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private DigitalAsset digitalAsset;

    private LocalDateTime accessTimestamp;
    private String ipAddress;
}
