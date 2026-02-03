package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "DigitalAssets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DigitalAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assetId;

    @ManyToOne
    @JoinColumn(name = "isbn")
    private Book book;

    @Enumerated(EnumType.STRING)
    private FileFormat fileFormat;

    private BigDecimal fileSizeMB;
    private String downloadUrl;

    @Enumerated(EnumType.STRING)
    private AccessLevel accessLevel;

    public enum FileFormat {
        PDF, EPUB, MOBI
    }

    public enum AccessLevel {
        PUBLIC, RESTRICTED, PRIVATE
    }
}
