package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportingController {
    private final BookRepository bookRepository;
    private final LoanRepository loanRepository;
    private final ReaderRepository readerRepository;
    private final FineRepository fineRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // 1. Book Resources Distro
        long totalBooks = bookRepository.count();
        long physicalBooks = bookRepository.findAll().stream().filter(b -> "PHYSICAL".equals(b.getBookType())).count();
        long digitalBooks = bookRepository.findAll().stream().filter(b -> "DIGITAL".equals(b.getBookType())).count();
        long bothBooks = totalBooks - physicalBooks - digitalBooks;
        
        stats.put("bookDistro", Map.of(
            "physical", physicalBooks,
            "digital", digitalBooks,
            "both", bothBooks
        ));

        // 2. Loan Stats
        long totalLoans = loanRepository.count();
        long activeLoans = loanRepository.findAll().stream().filter(l -> "BORROWED".equals(l.getStatus().toString())).count();
        long returnedLoans = loanRepository.findAll().stream().filter(l -> "RETURNED".equals(l.getStatus().toString())).count();
        long overdueLoans = loanRepository.findAll().stream().filter(l -> "OVERDUE".equals(l.getStatus().toString())).count();
        
        stats.put("loans", Map.of(
            "total", totalLoans,
            "active", activeLoans,
            "returned", returnedLoans,
            "overdue", overdueLoans,
            "returnRate", totalLoans > 0 ? (returnedLoans * 100.0 / totalLoans) : 0,
            "overdueRate", totalLoans > 0 ? (overdueLoans * 100.0 / totalLoans) : 0,
            "borrowedRate", totalLoans > 0 ? (activeLoans * 100.0 / totalLoans) : 0
        ));

        // 3. User Trends (Mocked for Demo as we don't have createdAt yet in models, but counting readers)
        stats.put("userCount", readerRepository.count());

        return stats;
    }
}
