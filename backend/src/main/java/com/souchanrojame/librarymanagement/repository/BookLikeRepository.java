package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.BookLike;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookLikeRepository extends JpaRepository<BookLike, Integer> {
    Optional<BookLike> findByBookIsbnAndReaderEmail(String bookIsbn, String readerEmail);
    long countByBookIsbn(String bookIsbn);
    boolean existsByBookIsbnAndReaderEmail(String bookIsbn, String readerEmail);

    @org.springframework.data.jpa.repository.Query("SELECT b FROM Book b JOIN BookLike bl ON b.isbn = bl.bookIsbn WHERE bl.readerEmail = :email")
    java.util.List<com.souchanrojame.librarymanagement.model.Book> findBooksByReaderEmail(@org.springframework.data.repository.query.Param("email") String email);
}
