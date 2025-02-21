package com.rentalmanagement.controller;

import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.UserRepository;
import com.rentalmanagement.service.JwtService;
import com.rentalmanagement.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(UserRepository userRepository, 
                          PasswordEncoder passwordEncoder, 
                          JwtService jwtService,
                          CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    // User Registration Endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username is already taken."));
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully."));
    }

    // User Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent() &&
            passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            
            // Load UserDetails from custom service
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtService.generateToken(userDetails);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", existingUser.get().getUsername()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password."));
        }
    }
}



