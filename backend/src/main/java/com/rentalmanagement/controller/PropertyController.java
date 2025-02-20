package com.rentalmanagement.controller;

import com.rentalmanagement.model.Property;
import com.rentalmanagement.repository.PropertyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this origin as needed
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // GET /api/properties - Retrieve all properties
    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return ResponseEntity.ok(properties);
    }

    // GET /api/properties/{id} - Retrieve a property by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        return ResponseEntity.ok(property);
    }

    // POST /api/properties - Create a new property
    @PostMapping
    public ResponseEntity<?> createProperty(@RequestBody Property property) {
        // Basic validation: name, location, cost must be non-null and non-empty, bedrooms >= 1
        if (property.getName() == null || property.getName().trim().isEmpty() ||
            property.getLocation() == null || property.getLocation().trim().isEmpty() ||
            property.getCost() == null || property.getCost().trim().isEmpty() ||
            property.getBedrooms() < 1) {
            
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid property data. Please fill all required fields properly.");
        }

        Property savedProperty = propertyRepository.save(property);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }

    // DELETE /api/properties/{id} - Delete a property by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        if (!propertyRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Property not found with id: " + id);
        }
        propertyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}




