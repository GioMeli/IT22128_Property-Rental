package com.rentalmanagement.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class RentalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Property property;

    private String status;
    private LocalDate requestDate;

    // Getters and setters
}
