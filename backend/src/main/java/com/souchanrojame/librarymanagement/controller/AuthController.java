package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Staff;
import com.souchanrojame.librarymanagement.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final StaffRepository staffRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String loginId = credentials.get("loginId");
        String password = credentials.get("password");
        
        return staffRepository.findByLoginId(loginId)
            .filter(staff -> staff.getPassword().equals(password))
            .map(staff -> {
                Map<String, Object> response = new HashMap<>();
                response.put("staffId", staff.getStaffId());
                response.put("staffName", staff.getStaffName());
                response.put("loginId", staff.getLoginId());
                response.put("email", staff.getEmail());
                response.put("role", staff.getRole().name());
                response.put("canManageDigital", staff.getCanManageDigital());
                response.put("profileImage", staff.getProfileImage());
                response.put("phoneNumber", staff.getPhoneNumber());
                response.put("address", staff.getAddress());
                response.put("joinDate", staff.getJoinDate() != null ? staff.getJoinDate().toString() : null);
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        String loginId = data.get("loginId");
        String password = data.get("password");
        String name = data.get("name");
        String email = data.get("email");
        String roleStr = data.getOrDefault("role", "BORROWER");

        if (staffRepository.existsByLoginId(loginId)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        if (email != null && staffRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        Staff.StaffRole role;
        try {
            role = Staff.StaffRole.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            role = Staff.StaffRole.BORROWER;
        }

        Staff staff = Staff.builder()
                .loginId(loginId)
                .password(password)
                .staffName(name)
                .email(email)
                .role(role)
                .canManageDigital(false)
                .joinDate(java.time.LocalDate.now())
                .profileImage("/static/UI/login.png")
                .build();

        staffRepository.save(staff);

        Map<String, Object> response = new HashMap<>();
        response.put("staffId", staff.getStaffId());
        response.put("staffName", staff.getStaffName());
        response.put("loginId", staff.getLoginId());
        response.put("email", staff.getEmail());
        response.put("role", staff.getRole().name());
        response.put("profileImage", staff.getProfileImage());
        response.put("joinDate", staff.getJoinDate().toString());
        return ResponseEntity.ok(response);
    }
}
