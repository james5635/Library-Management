package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.isbn) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "EXISTS (SELECT a FROM b.authors a WHERE LOWER(a.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(a.lastName) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Book> searchBooks(@Param("query") String query);

    List<Book> findByCategoryCategoryName(String categoryName);
    List<Book> findByBookType(Book.BookType bookType);
}
