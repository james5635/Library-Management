package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
}
