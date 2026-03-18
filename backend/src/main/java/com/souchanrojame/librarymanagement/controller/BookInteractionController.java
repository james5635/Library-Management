package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.BookComment;
import com.souchanrojame.librarymanagement.model.BookLike;
import com.souchanrojame.librarymanagement.repository.BookCommentRepository;
import com.souchanrojame.librarymanagement.repository.BookLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookInteractionController {
    private final BookLikeRepository bookLikeRepository;
    private final BookCommentRepository bookCommentRepository;

    // --- Likes ---
    @PostMapping("/{isbn}/like")
    public Map<String, Object> toggleLike(@PathVariable String isbn, @RequestBody Map<String, String> body) {
        String email = body.get("email");
        var existing = bookLikeRepository.findByBookIsbnAndReaderEmail(isbn, email);
        if (existing.isPresent()) {
            bookLikeRepository.delete(existing.get());
            return Map.of("liked", false, "count", bookLikeRepository.countByBookIsbn(isbn));
        } else {
            bookLikeRepository.save(BookLike.builder()
                    .bookIsbn(isbn)
                    .readerEmail(email)
                    .createdAt(LocalDateTime.now())
                    .build());
            return Map.of("liked", true, "count", bookLikeRepository.countByBookIsbn(isbn));
        }
    }

    @GetMapping("/{isbn}/likes")
    public Map<String, Object> getLikes(@PathVariable String isbn, @RequestParam(required = false) String email) {
        long count = bookLikeRepository.countByBookIsbn(isbn);
        boolean liked = email != null && bookLikeRepository.existsByBookIsbnAndReaderEmail(isbn, email);
        return Map.of("count", count, "liked", liked);
    }

    @GetMapping("/user/{email}/likes")
    public List<com.souchanrojame.librarymanagement.model.Book> getUserLikedBooks(@PathVariable String email) {
        return bookLikeRepository.findBooksByReaderEmail(email);
    }

    // --- Comments ---
    @PostMapping("/{isbn}/comments")
    public BookComment addComment(@PathVariable String isbn, @RequestBody Map<String, String> body) {
        return bookCommentRepository.save(BookComment.builder()
                .bookIsbn(isbn)
                .readerEmail(body.get("email"))
                .readerName(body.get("name"))
                .content(body.get("content"))
                .createdAt(LocalDateTime.now())
                .build());
    }

    @GetMapping("/{isbn}/comments")
    public List<BookComment> getComments(@PathVariable String isbn) {
        return bookCommentRepository.findByBookIsbnOrderByCreatedAtDesc(isbn);
    }
}
