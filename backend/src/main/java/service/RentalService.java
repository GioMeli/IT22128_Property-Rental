package com.example.rentalsystem.service;

import com.example.rentalsystem.model.Property;
import com.example.rentalsystem.model.Rental;
import com.example.rentalsystem.model.User;
import com.example.rentalsystem.repository.RentalRepository;
import com.example.rentalsystem.repository.PropertyRepository;
import com.example.rentalsystem.repository.UserRepository;
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

    // Δημιουργία νέας ενοικίασης
    @Transactional
    public Rental createRental(Long userId, Long propertyId, String rentalPeriod) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);

        if (userOpt.isPresent() && propertyOpt.isPresent()) {
            User user = userOpt.get();
            Property property = propertyOpt.get();

            // Ελέγξτε αν το ακίνητο είναι διαθέσιμο
            if (!property.isAvailable()) {
                throw new IllegalArgumentException("Property is not available for rent.");
            }

            // Δημιουργία ενοικίασης
            Rental rental = new Rental();
            rental.setUser(user);
            rental.setProperty(property);
            rental.setRentalPeriod(rentalPeriod);
            rental.setStatus("Active");

            // Αποθήκευση ενοικίασης
            return rentalRepository.save(rental);
        } else {
            throw new IllegalArgumentException("Invalid user or property.");
        }
    }

    // Εύρεση όλων των ενοικιάσεων για έναν χρήστη
    public List<Rental> getRentalsByUser(Long userId) {
        return rentalRepository.findByUserId(userId);
    }

    // Εύρεση όλων των ενεργών ενοικιάσεων
    public List<Rental> getActiveRentals() {
        return rentalRepository.findByStatus("Active");
    }

    // Εύρεση όλων των ενοικιάσεων για ένα ακίνητο
    public List<Rental> getRentalsByProperty(Long propertyId) {
        return rentalRepository.findByPropertyId(propertyId);
    }

    // Ακύρωση ενοικίασης
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

    // Επιστροφή ακινήτου (με την έννοια ότι το ακίνητο είναι ξανά διαθέσιμο για ενοικίαση)
    @Transactional
    public Property returnProperty(Long rentalId) {
        Optional<Rental> rentalOpt = rentalRepository.findById(rentalId);
        if (rentalOpt.isPresent()) {
            Rental rental = rentalOpt.get();
            rental.setStatus("Completed");

            Property property = rental.getProperty();
            property.setAvailable(true); // Κάνουμε το ακίνητο διαθέσιμο ξανά
            propertyRepository.save(property);
            rentalRepository.save(rental);
            return property;
        } else {
            throw new IllegalArgumentException("Rental not found.");
        }
    }
}
