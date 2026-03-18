package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BookLikes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"bookIsbn", "readerEmail"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeId;

    private String bookIsbn;
    private String readerEmail;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
