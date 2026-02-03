package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Publishers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer publisherId;

    private String publisherName;
    private Integer yearOfPublication;
}
