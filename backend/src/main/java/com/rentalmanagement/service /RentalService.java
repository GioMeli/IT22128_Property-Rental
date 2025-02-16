package com.rentalmanagement.service;

import com.rentalmanagement.model.Property;
import com.rentalmanagement.model.Rental;
import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.RentalRepository;
import com.rentalmanagement.repository.PropertyRepository;
import com.rentalmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new rental
    @Transactional
    public Rental createRental(Long userId, Long propertyId, String rentalPeriod) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);

        if (userOpt.isPresent() && propertyOpt.isPresent()) {
            User user = userOpt.get();
            Property property = propertyOpt.get();

            // Check if the property is available
            if (!property.isAvailable()) {
                throw new IllegalArgumentException("Property is not available for rent.");
            }

            // Create a new rental
            Rental rental = new Rental();
            rental.setUser(user);
            rental.setProperty(property);
            rental.setRentalPeriod(rentalPeriod);
            rental.setStatus("Active");

            // Save the rental
            return rentalRepository.save(rental);
        } else {
            throw new IllegalArgumentException("Invalid user or property.");
        }
    }

    // Find all rentals for a given user
    public List<Rental> getRentalsByUser(Long userId) {
        return rentalRepository.findByUserId(userId);
    }

    // Find all active rentals
    public List<Rental> getActiveRentals() {
        return rentalRepository.findByStatus("Active");
    }

    // Find all rentals for a given property
    public List<Rental> getRentalsByProperty(Long propertyId) {
        return rentalRepository.findByPropertyId(propertyId);
    }

    // Cancel a rental
    @Transactional
    public Rental cancelRental(Long rentalId) {
        Optional<Rental> rentalOpt = rentalRepository.findById(rentalId);
        if (rentalOpt.isPresent()) {
            Rental rental = rentalOpt.get();
            rental.setStatus("Cancelled");
            return rentalRepository.save(rental);
        } else {
            throw new IllegalArgumentException("Rental not found.");
        }
    }

    // Return a property (i.e., make the property available for rental again)
    @Transactional
    public Property returnProperty(Long rentalId) {
        Optional<Rental> rentalOpt = rentalRepository.findById(rentalId);
        if (rentalOpt.isPresent()) {
            Rental rental = rentalOpt.get();
            rental.setStatus("Completed");

            Property property = rental.getProperty();
            property.setAvailable(true); // Make the property available again
            propertyRepository.save(property);
            rentalRepository.save(rental);
            return property;
        } else {
            throw new IllegalArgumentException("Rental not found.");
        }
    }
}
