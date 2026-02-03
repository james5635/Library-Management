package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.DigitalAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DigitalAssetRepository extends JpaRepository<DigitalAsset, Integer> {
    List<DigitalAsset> findByBookIsbn(String isbn);
}
