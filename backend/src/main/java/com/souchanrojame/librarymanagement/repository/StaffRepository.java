package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<Staff> findByLoginId(String loginId);
}
