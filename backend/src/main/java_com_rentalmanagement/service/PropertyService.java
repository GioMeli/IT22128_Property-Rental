package com.rentalmanagement.service;

import com.rentalmanagement.model.Property;
import com.rentalmanagement.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    // Other methods
}

