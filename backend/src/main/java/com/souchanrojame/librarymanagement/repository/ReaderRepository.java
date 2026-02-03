package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Reader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Integer> {
    Optional<Reader> findByEmail(String email);
}
