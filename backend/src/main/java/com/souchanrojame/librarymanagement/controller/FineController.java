package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Fine;
import com.souchanrojame.librarymanagement.repository.FineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fines")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FineController {
    private final FineRepository fineRepository;

    @GetMapping
    public List<Fine> getAllFines() {
        return fineRepository.findAll();
    }

    @PatchMapping("/{id}/pay")
    public Fine payFine(@PathVariable Integer id) {
        Fine fine = fineRepository.findById(id).orElseThrow(() -> new java.util.NoSuchElementException("Fine not found with ID: " + id));
        fine.setStatus(Fine.FineStatus.PAID);
        return fineRepository.save(fine);
    }
}
