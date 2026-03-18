package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Staffs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer staffId;

    private String staffName;
    
    @Column(unique = true)
    private String loginId;
    
    private String password;
    
    @Column(unique = true)
    private String email;
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StaffRole role = StaffRole.BORROWER;
    
    private Boolean canManageDigital;

    public enum StaffRole {
        ADMIN, LIBRARIAN, BORROWER
    }
}
