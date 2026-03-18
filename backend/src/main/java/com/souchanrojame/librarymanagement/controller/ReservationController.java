package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Reservation;
import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.repository.ReservationRepository;
import com.souchanrojame.librarymanagement.repository.BookRepository;
import com.souchanrojame.librarymanagement.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    private final ReservationRepository reservationRepository;
    private final BookRepository bookRepository;
    private final ReaderRepository readerRepository;

    @GetMapping
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation create(@RequestBody Map<String, String> body) {
        String isbn = body.get("isbn");
        String email = body.get("email");

        Book book = bookRepository.findById(isbn)
                .orElseThrow(() -> new java.util.NoSuchElementException("Book not found"));
        Reader reader = readerRepository.findByEmail(email)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reader not found"));

        Reservation reservation = Reservation.builder()
                .book(book)
                .reader(reader)
                .reservationDate(LocalDate.now())
                .status(Reservation.ReservationStatus.ACTIVE)
                .build();

        // Update book status
        book.setStatus(Book.BookStatus.RESERVED);
        bookRepository.save(book);

        return reservationRepository.save(reservation);
    }

    @PutMapping("/{id}/cancel")
    public Reservation cancel(@PathVariable Integer id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reservation not found"));
        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);

        // Restore book status
        Book book = reservation.getBook();
        book.setStatus(Book.BookStatus.AVAILABLE);
        bookRepository.save(book);

        return reservationRepository.save(reservation);
    }
}
