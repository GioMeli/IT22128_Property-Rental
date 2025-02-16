package com.rentalmanagement.repository;

import com.rentalmanagement.model.RentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<RentalRequest, Long> {
}
