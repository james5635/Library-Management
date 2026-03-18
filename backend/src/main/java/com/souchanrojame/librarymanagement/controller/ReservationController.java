package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Reservation;
import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.model.Loan;
import com.souchanrojame.librarymanagement.model.Staff;
import com.souchanrojame.librarymanagement.repository.ReservationRepository;
import com.souchanrojame.librarymanagement.repository.BookRepository;
import com.souchanrojame.librarymanagement.repository.ReaderRepository;
import com.souchanrojame.librarymanagement.repository.LoanRepository;
import com.souchanrojame.librarymanagement.repository.StaffRepository;
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
    private final LoanRepository loanRepository;
    private final StaffRepository staffRepository;

    @GetMapping("/active")
    public List<Reservation> getActive() {
        return reservationRepository.findByStatus(Reservation.ReservationStatus.ACTIVE);
    }

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

    @PutMapping("/{id}/accept")
    @org.springframework.transaction.annotation.Transactional
    public Loan accept(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        System.out.println("Accept reservation called: id=" + id + ", body=" + body);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reservation not found with id: " + id));

        Object staffIdObj = body.get("staffId");
        Integer staffId;
        if (staffIdObj instanceof Integer) {
            staffId = (Integer) staffIdObj;
        } else if (staffIdObj instanceof Number) {
            staffId = ((Number) staffIdObj).intValue();
        } else {
            throw new IllegalArgumentException("Invalid staffId: " + staffIdObj);
        }
        
        System.out.println("Looking for staff with id: " + staffId);
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new java.util.NoSuchElementException("Staff not found with id: " + staffId));

        Book book = reservation.getBook();
        Reader reader = reservation.getReader();

        Loan loan = Loan.builder()
                .book(book)
                .reader(reader)
                .staff(staff)
                .issueDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(7))
                .status(Loan.LoanStatus.BORROWED)
                .build();

        // Update book status - mark as BORROWED
        book.setStatus(Book.BookStatus.BORROWED);
        bookRepository.save(book);

        // Mark reservation as fulfilled
        reservation.setStatus(Reservation.ReservationStatus.FULFILLED);
        reservationRepository.save(reservation);

        return loanRepository.save(loan);
    }
}
