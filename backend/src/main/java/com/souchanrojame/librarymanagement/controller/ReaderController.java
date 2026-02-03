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

    @PostMapping
    public Reader createReader(@RequestBody Reader reader) {
        return readerRepository.save(reader);
    }

    @DeleteMapping("/{id}")
    public void deleteReader(@PathVariable Integer id) {
        readerRepository.deleteById(id);
    }
}
