package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Fines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fineId;

    @OneToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    private Double amount;
    private LocalDateTime createdAt;
    
    @Enumerated(EnumType.STRING)
    private FineStatus status;

    public enum FineStatus {
        PAID, UNPAID
    }
}
