package com.souchanrojame.librarymanagement.repository;

import com.souchanrojame.librarymanagement.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByBookIsbn(String isbn);
    List<Reservation> findByReaderEmail(String email);
    List<Reservation> findByStatus(Reservation.ReservationStatus status);
}
