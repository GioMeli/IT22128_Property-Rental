package com.rentalmanagement.controller;

import com.rentalmanagement.model.Application;
import com.rentalmanagement.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    // POST endpoint to create a new application
    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        Application savedApplication = applicationRepository.save(application);
        return ResponseEntity.ok(savedApplication);
    }

    // GET endpoint to retrieve all applications
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        return ResponseEntity.ok(applications);
    }

    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteApplication(@PathVariable Long id) {
    if (!applicationRepository.existsById(id)) {
        return ResponseEntity.notFound().build();
    }
    applicationRepository.deleteById(id);
    return ResponseEntity.ok("Application deleted successfully.");
}

}
