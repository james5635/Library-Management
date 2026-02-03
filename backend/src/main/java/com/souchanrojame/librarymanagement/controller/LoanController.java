package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Loan;
import com.souchanrojame.librarymanagement.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
    private final LoanRepository loanRepository;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @PostMapping
    public Loan createLoan(@RequestBody Loan loan) {
        return loanRepository.save(loan);
    }

    @PutMapping("/{id}/return")
    public Loan returnBook(@PathVariable Integer id) {
        Loan loan = loanRepository.findById(id).orElseThrow();
        loan.setStatus(Loan.LoanStatus.RETURNED);
        loan.setReturnDate(java.time.LocalDate.now());
        return loanRepository.save(loan);
    }
}
