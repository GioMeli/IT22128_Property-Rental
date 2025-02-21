package com.rentalmanagement.controller;

import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.UserRepository;
import com.rentalmanagement.service.JwtService;
import com.rentalmanagement.service.UserService; // Ensure this implements UserDetailsService
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
    private final UserService userService;

    @Autowired
    public AuthController(UserRepository userRepository, JwtService jwtService, UserService userService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    // User Login Endpoint using plain text password comparison
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User storedUser = userOptional.get();
            // Plain text comparison; ensure stored password exactly matches "123Gm456"
            if (storedUser.getPassword().equals(loginRequest.getPassword())) {
                // Load UserDetails from your UserService
                UserDetails userDetails = userService.loadUserByUsername(storedUser.getUsername());
                String token = jwtService.generateToken(userDetails);
                return ResponseEntity.ok(Map.of("token", token, "username", storedUser.getUsername()));
            }
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password."));
    }
}




