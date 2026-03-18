package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Staff;
import com.souchanrojame.librarymanagement.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {
    private final StaffRepository staffRepository;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @GetMapping("/{id}")
    public Staff getStaff(@PathVariable Integer id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Staff not found with ID: " + id));
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        if (staff.getRole() == null) staff.setRole(Staff.StaffRole.BORROWER);
        return staffRepository.save(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Integer id, @RequestBody Staff staff) {
        Staff existing = staffRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Staff not found"));
        existing.setStaffName(staff.getStaffName());
        existing.setLoginId(staff.getLoginId());
        existing.setEmail(staff.getEmail());
        if (staff.getRole() != null) existing.setRole(staff.getRole());
        if (staff.getCanManageDigital() != null) existing.setCanManageDigital(staff.getCanManageDigital());
        if (staff.getProfileImage() != null) existing.setProfileImage(staff.getProfileImage());
        if (staff.getPhoneNumber() != null) existing.setPhoneNumber(staff.getPhoneNumber());
        if (staff.getAddress() != null) existing.setAddress(staff.getAddress());
        
        if (staff.getPassword() != null && !staff.getPassword().isEmpty()) {
            existing.setPassword(staff.getPassword());
        }
        return staffRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Integer id) {
        staffRepository.deleteById(id);
    }
}
