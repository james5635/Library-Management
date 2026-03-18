package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Book;
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
    private final StaffRepository staffRepository;
    private final CategoryRepository categoryRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // 1. Book Resources Distro
        long totalBooks = bookRepository.count();
        long physicalBooks = bookRepository.findByBookType(Book.BookType.PHYSICAL).size();
        long digitalBooks = bookRepository.findByBookType(Book.BookType.DIGITAL).size();
        long bothBooks = totalBooks - physicalBooks - digitalBooks;
        
        stats.put("bookDistro", Map.of(
            "physical", physicalBooks,
            "digital", digitalBooks,
            "both", bothBooks
        ));

        // 2. Book Status
        stats.put("bookStatus", Map.of(
            "available", bookRepository.countByStatus(Book.BookStatus.AVAILABLE),
            "borrowed", bookRepository.countByStatus(Book.BookStatus.BORROWED),
            "reserved", bookRepository.countByStatus(Book.BookStatus.RESERVED),
            "lost", bookRepository.countByStatus(Book.BookStatus.LOST)
        ));

        // 3. Loan Stats
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

        // 4. User/Reader count
        stats.put("userCount", readerRepository.count());
        stats.put("staffCount", staffRepository.count());
        stats.put("totalBooks", totalBooks);

        // 5. Category Distribution
        List<Map<String, Object>> categoryData = new ArrayList<>();
        categoryRepository.findAll().forEach(cat -> {
            long count = bookRepository.countByCategoryCategoryId(cat.getCategoryId());
            if (count > 0) {
                Map<String, Object> item = new HashMap<>();
                item.put("name", cat.getCategoryName());
                item.put("count", count);
                categoryData.add(item);
            }
        });
        stats.put("categoryDistribution", categoryData);

        // 6. Popular Books (most borrowed - mocked with loan count)
        List<Map<String, Object>> popularBooks = new ArrayList<>();
        var allLoans = loanRepository.findAll();
        Map<String, Long> bookLoanCount = allLoans.stream()
                .collect(Collectors.groupingBy(l -> l.getBook().getIsbn(), Collectors.counting()));
        
        bookLoanCount.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .forEach(entry -> {
                    bookRepository.findById(entry.getKey()).ifPresent(book -> {
                        Map<String, Object> item = new HashMap<>();
                        item.put("title", book.getTitle());
                        item.put("isbn", book.getIsbn());
                        item.put("loanCount", entry.getValue());
                        item.put("category", book.getCategory() != null ? book.getCategory().getCategoryName() : "N/A");
                        popularBooks.add(item);
                    });
                });
        stats.put("popularBooks", popularBooks);

        // 7. Monthly Trend (mocked for demo)
        List<Map<String, Object>> monthlyTrend = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        int[] borrowed = {12, 18, 15, 22, 30, 25};
        int[] returned = {10, 15, 12, 20, 28, 22};
        int[] newUsers = {5, 8, 6, 12, 15, 10};
        for (int i = 0; i < months.length; i++) {
            Map<String, Object> m = new HashMap<>();
            m.put("month", months[i]);
            m.put("borrowed", borrowed[i]);
            m.put("returned", returned[i]);
            m.put("newUsers", newUsers[i]);
            monthlyTrend.add(m);
        }
        stats.put("monthlyTrend", monthlyTrend);

        return stats;
    }
}
