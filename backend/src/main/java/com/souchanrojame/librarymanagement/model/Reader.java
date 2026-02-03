package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Readers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String firstName;
    private String lastName;
    
    @Column(unique = true)
    private String email;
    
    private String phoneNumber;
    private String address;
    private LocalDate joinDate;
}
