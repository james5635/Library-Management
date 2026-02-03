package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Bookmark;
import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.repository.BookmarkRepository;
import com.souchanrojame.librarymanagement.repository.BookRepository;
import com.souchanrojame.librarymanagement.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {
    private final BookmarkRepository bookmarkRepository;
    private final BookRepository bookRepository;
    private final ReaderRepository readerRepository;

    @GetMapping("/user/{email}")
    public List<Bookmark> getBookmarksByUser(@PathVariable String email) {
        return bookmarkRepository.findByReaderEmail(email);
    }

    @PostMapping("/toggle")
    @Transactional
    public Map<String, Object> toggleBookmark(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String isbn = payload.get("isbn");

        Reader reader = readerRepository.findByEmail(email).orElseThrow(() -> new java.util.NoSuchElementException("User not found"));
        Book book = bookRepository.findById(isbn).orElseThrow(() -> new java.util.NoSuchElementException("Book not found"));

        Optional<Bookmark> existing = bookmarkRepository.findByReaderAndBook(reader, book);
        if (existing.isPresent()) {
            bookmarkRepository.deleteByReaderAndBook(reader, book);
            return Map.of("status", "removed");
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .reader(reader)
                    .book(book)
                    .createdAt(LocalDateTime.now())
                    .build();
            bookmarkRepository.save(bookmark);
            return Map.of("status", "added");
        }
    }
    
    @GetMapping("/check")
    public Map<String, Boolean> checkBookmark(@RequestParam String email, @RequestParam String isbn) {
        Reader reader = readerRepository.findByEmail(email).orElse(null);
        Book book = bookRepository.findById(isbn).orElse(null);
        if (reader == null || book == null) return Map.of("isBookmarked", false);
        
        return Map.of("isBookmarked", bookmarkRepository.findByReaderAndBook(reader, book).isPresent());
    }
}
