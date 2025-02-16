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

    @Transactional
    public Rental createRental(Long userId, Long propertyId, String rentalPeriod) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);

        if (userOpt.isPresent() && propertyOpt.isPresent()) {
            User user = userOpt.get();
            Property property = propertyOpt.get();

            // Check if the property is available (make sure Property has an isAvailable() method)
            if (!property.isAvailable()) {
                throw new IllegalArgumentException("Property is not available for rent.");
            }

            Rental rental = new Rental();
            rental.setUser(user);
            rental.setProperty(property);
            rental.setRentalPeriod(rentalPeriod);
            rental.setStatus("Active");

            return rentalRepository.save(rental);
        } else {
            throw new IllegalArgumentException("Invalid user or property.");
        }
    }

    public List<Rental> getRentalsByUser(Long userId) {
        return rentalRepository.findByUserId(userId);
    }

    public List<Rental> getActiveRentals() {
        return rentalRepository.findByStatus("Active");
    }

    public List<Rental> getRentalsByProperty(Long propertyId) {
        return rentalRepository.findByPropertyId(propertyId);
    }

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

    @Transactional
    public Property returnProperty(Long rentalId) {
        Optional<Rental> rentalOpt = rentalRepository.findById(rentalId);
        if (rentalOpt.isPresent()) {
            Rental rental = rentalOpt.get();
            rental.setStatus("Completed");

            Property property = rental.getProperty();
            property.setAvailable(true);
            // Save the property and rental updates
            propertyRepository.save(property);
            rentalRepository.save(rental);
            return property;
        } else {
            throw new IllegalArgumentException("Rental not found.");
        }
    }
}
