package com.rentalmanagement.model;

import jakarta.persistence.*;

@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private double price;

    // Getters and Setters
}

