package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.model.Book;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
    Optional<Loan> findByReaderEmailAndBookIsbnAndStatus(String email, String isbn, Loan.LoanStatus status);
}
