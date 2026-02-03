package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String search, 
                                 @RequestParam(required = false) String category) {
        if (search != null && !search.isEmpty()) {
            return bookRepository.searchBooks(search);
        }
        if (category != null && !category.isEmpty()) {
            return bookRepository.findByCategoryCategoryName(category);
        }
        return bookRepository.findAll();
    }

    @GetMapping("/{isbn}")
    public Book getBookByIsbn(@PathVariable String isbn) {
        return bookRepository.findById(isbn).orElseThrow(() -> new java.util.NoSuchElementException("Book not found with ISBN: " + isbn));
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PutMapping("/{isbn}")
    public Book updateBook(@PathVariable String isbn, @RequestBody Book book) {
        book.setIsbn(isbn);
        return bookRepository.save(book);
    }

    @DeleteMapping("/{isbn}")
    public void deleteBook(@PathVariable String isbn) {
        bookRepository.deleteById(isbn);
    }
}
