package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Bookmark;
import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    List<Bookmark> findByReaderEmail(String email);
    Optional<Bookmark> findByReaderAndBook(Reader reader, Book book);
    void deleteByReaderAndBook(Reader reader, Book book);
}
