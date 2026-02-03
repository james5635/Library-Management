package com.souchanrojame.librarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Bookmarks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookmarkId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "isbn")
    private Book book;

    private LocalDateTime createdAt;
}
