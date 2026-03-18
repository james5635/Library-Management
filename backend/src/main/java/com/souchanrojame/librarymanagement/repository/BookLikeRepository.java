package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.BookLike;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookLikeRepository extends JpaRepository<BookLike, Integer> {
    Optional<BookLike> findByBookIsbnAndReaderEmail(String bookIsbn, String readerEmail);
    long countByBookIsbn(String bookIsbn);
    boolean existsByBookIsbnAndReaderEmail(String bookIsbn, String readerEmail);
}
