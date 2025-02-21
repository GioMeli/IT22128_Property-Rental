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

@PostMapping("/login")
public void login(@RequestBody User user, HttpServletResponse response) throws IOException {
    Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
    if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
        // Generate token if needed
        // For a redirect, simply send a redirect response
        response.sendRedirect("http://localhost:3000/home");
    } else {
        response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid username or password.");
    }
}



