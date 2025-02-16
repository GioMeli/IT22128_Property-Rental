package com.rentalmanagement.model;

import javax.persistence.*;

@Entity
@Table(name = "rentals")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Assuming a rental is associated with one user and one property
    @ManyToOne
    private User user;

    @ManyToOne
    private Property property;

    private String rentalPeriod;
    private String status; // e.g. "Active", "Cancelled", "Completed"

    // Getters and Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Property getProperty() {
        return property;
    }
    public void setProperty(Property property) {
        this.property = property;
    }
    public String getRentalPeriod() {
        return rentalPeriod;
    }
    public void setRentalPeriod(String rentalPeriod) {
        this.rentalPeriod = rentalPeriod;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
