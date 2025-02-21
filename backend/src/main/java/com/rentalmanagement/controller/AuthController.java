package com.rentalmanagement.controller;

import com.rentalmanagement.model.User;
import com.rentalmanagement.repository.UserRepository;
import com.rentalmanagement.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Example endpoint for login (adjust as needed)
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // In a real application, you would authenticate the user.
        // Here we simply return a dummy token if the user exists.
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return "dummy-token";
        } else {
            throw new IllegalArgumentException("Invalid username or password.");
        }
    }
}


