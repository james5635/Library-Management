package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Reader;
import com.souchanrojame.librarymanagement.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/readers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReaderController {
    private final ReaderRepository readerRepository;

    @GetMapping
    public List<Reader> getAllReaders() {
        return readerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Reader getOneReader(@PathVariable Integer id) {
        return readerRepository.findById(id).orElseThrow(() -> new java.util.NoSuchElementException("Member not found with ID: " + id));
    }

    @PostMapping
    public Reader createReader(@RequestBody Reader reader) {
        if (reader.getJoinDate() == null) reader.setJoinDate(java.time.LocalDate.now());
        if (reader.getProfileImage() == null || reader.getProfileImage().isEmpty()) {
            reader.setProfileImage("/static/UI/login.png");
        }
        return readerRepository.save(reader);
    }

    @PutMapping("/{id}")
    public Reader updateReader(@PathVariable Integer id, @RequestBody Reader reader) {
        Reader existing = readerRepository.findById(id).orElseThrow(() -> new java.util.NoSuchElementException("Member not found with ID: " + id));
        existing.setFirstName(reader.getFirstName());
        existing.setLastName(reader.getLastName());
        existing.setEmail(reader.getEmail());
        existing.setPhoneNumber(reader.getPhoneNumber());
        existing.setAddress(reader.getAddress());
        existing.setProfileImage(reader.getProfileImage());
        return readerRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteReader(@PathVariable Integer id) {
        readerRepository.deleteById(id);
    }
}
