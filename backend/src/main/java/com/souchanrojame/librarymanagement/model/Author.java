package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer authorId;

    private String firstName;
    private String lastName;
    
    @Column(columnDefinition = "TEXT")
    private String biography;
}
