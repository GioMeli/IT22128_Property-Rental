package com.rentalmanagement.controller;

import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Minimal signup endpoint (no password hashing)
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if username already exists
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username is already taken."));
        }
        // Store username & password in plain text (testing only)
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User created successfully."));
    }
}


