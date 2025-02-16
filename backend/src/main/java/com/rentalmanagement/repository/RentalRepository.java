package com.rentalmanagement.repository;

import com.rentalmanagement.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {
    List<Rental> findByUserId(Long userId);
    List<Rental> findByStatus(String status);
    List<Rental> findByPropertyId(Long propertyId);
}
