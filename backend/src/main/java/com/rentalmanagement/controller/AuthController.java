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

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userRepository.findByUsername(username);

        Map<String, Object> response = new HashMap<>();
        if (user.isPresent()) {
            response.put("success", true);
            response.put("message", "Login successful.");
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password.");
        }

        return response;
    }

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


