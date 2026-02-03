package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Loan;
import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
    private final LoanRepository loanRepository;
    private final com.souchanrojame.librarymanagement.repository.FineRepository fineRepository;
    private final com.souchanrojame.librarymanagement.repository.BookRepository bookRepository;
    private final com.souchanrojame.librarymanagement.repository.ReaderRepository readerRepository;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @PostMapping
    @org.springframework.transaction.annotation.Transactional
    public Loan createLoan(@RequestBody Map<String, Object> payload) {
        String isbn = (String) ((Map) payload.get("book")).get("isbn");
        String email = (String) ((Map) payload.get("reader")).get("email");
        String dueDateStr = (String) payload.get("dueDate");

        Book book = bookRepository.findById(isbn).orElseThrow(() -> new java.util.NoSuchElementException("Book not found with ISBN: " + isbn));
        Reader reader = readerRepository.findByEmail(email).orElseGet(() -> {
            // Auto-create reader if not exists for demo purposes
            Reader newReader = Reader.builder()
                    .email(email)
                    .firstName("Sou")
                    .lastName("Chanrojame")
                    .joinDate(java.time.LocalDate.now())
                    .build();
            return readerRepository.save(newReader);
        });

        Loan loan = Loan.builder()
                .book(book)
                .reader(reader)
                .issueDate(java.time.LocalDate.now())
                .dueDate(java.time.LocalDate.parse(dueDateStr))
                .status(Loan.LoanStatus.BORROWED)
                .build();

        return loanRepository.save(loan);
    }

    @PutMapping("/{id}/return")
    public Loan returnBook(@PathVariable Integer id) {
        Loan loan = loanRepository.findById(id).orElseThrow(() -> new java.util.NoSuchElementException("Loan not found with ID: " + id));
        loan.setStatus(Loan.LoanStatus.RETURNED);
        java.time.LocalDate today = java.time.LocalDate.now();
        loan.setReturnDate(today);

        // Calculate Fine if overdue
        if (today.isAfter(loan.getDueDate())) {
            long daysOverdue = java.time.temporal.ChronoUnit.DAYS.between(loan.getDueDate(), today);
            double fineAmount = daysOverdue * 1.5; // $1.5 per day

            com.souchanrojame.librarymanagement.model.Fine fine = com.souchanrojame.librarymanagement.model.Fine.builder()
                    .loan(loan)
                    .amount(fineAmount)
                    .createdAt(java.time.LocalDateTime.now())
                    .status(com.souchanrojame.librarymanagement.model.Fine.FineStatus.UNPAID)
                    .build();
            fineRepository.save(fine);
            loan.setStatus(Loan.LoanStatus.OVERDUE);
        }

        return loanRepository.save(loan);
    }

    @GetMapping("/check")
    public Map<String, Boolean> checkActiveLoan(@RequestParam String email, @RequestParam String isbn) {
        Optional<Loan> loan = loanRepository.findByReaderEmailAndBookIsbnAndStatus(email, isbn, Loan.LoanStatus.BORROWED);
        return Map.of("hasActiveLoan", loan.isPresent());
    }
}
