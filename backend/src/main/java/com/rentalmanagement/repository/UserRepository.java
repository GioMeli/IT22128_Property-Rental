package com.rentalmanagement.repository;

import com.rentalmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query to find a user by username
    User findByUsername(String username);
}
