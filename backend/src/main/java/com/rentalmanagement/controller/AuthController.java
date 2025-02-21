package com.rentalmanagement.controller;

import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.UserRepository;
import com.rentalmanagement.service.JwtService;
import com.rentalmanagement.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(UserRepository userRepository,
                          JwtService jwtService,
                          CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    // User Registration Endpoint (storing password in plain text)
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username is already taken."));
        }
        // Store password as plain text
        user.setPassword(user.getPassword());
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully."));
    }

    // User Login Endpoint (plain text password comparison)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUserOptional = userRepository.findByUsername(user.getUsername());
        if (existingUserOptional.isPresent() &&
            existingUserOptional.get().getPassword().equals(user.getPassword())) {

            // Load UserDetails from custom service
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtService.generateToken(userDetails);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", existingUserOptional.get().getUsername()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password."));
        }
    }
}

