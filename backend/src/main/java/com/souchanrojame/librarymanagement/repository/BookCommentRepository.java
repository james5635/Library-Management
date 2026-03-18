package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.BookComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookCommentRepository extends JpaRepository<BookComment, Integer> {
    List<BookComment> findByBookIsbnOrderByCreatedAtDesc(String bookIsbn);
    long countByBookIsbn(String bookIsbn);
}
