package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.DigitalAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DigitalAssetRepository extends JpaRepository<DigitalAsset, Integer> {
}
