package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.DigitalAsset;
import com.souchanrojame.librarymanagement.repository.DigitalAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DigitalAssetController {
    private final DigitalAssetRepository digitalAssetRepository;

    @GetMapping("/book/{isbn}")
    public List<DigitalAsset> getAssetsByBook(@PathVariable String isbn) {
        return digitalAssetRepository.findByBookIsbn(isbn);
    }

    @PostMapping
    public DigitalAsset createAsset(@RequestBody DigitalAsset asset) {
        return digitalAssetRepository.save(asset);
    }
}
