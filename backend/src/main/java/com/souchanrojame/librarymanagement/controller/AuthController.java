package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Staff;
import com.souchanrojame.librarymanagement.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final StaffRepository staffRepository;

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> credentials) {
        String loginId = credentials.get("loginId");
        String password = credentials.get("password");
        
        return staffRepository.findByLoginId(loginId)
            .filter(staff -> staff.getPassword().equals(password))
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
