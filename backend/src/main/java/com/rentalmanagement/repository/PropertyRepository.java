package com.rentalmanagement.repository;

import com.rentalmanagement.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    // You can add custom queries if needed, e.g.:
    // List<Property> findByAvailable(boolean available);
}
