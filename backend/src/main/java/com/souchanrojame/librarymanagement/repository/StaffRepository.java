package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<Staff> findByLoginId(String loginId);
    Optional<Staff> findByEmail(String email);
    List<Staff> findByRole(Staff.StaffRole role);
    boolean existsByLoginId(String loginId);
    boolean existsByEmail(String email);
}
