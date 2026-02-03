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
    
    private Boolean canManageDigital;
}
