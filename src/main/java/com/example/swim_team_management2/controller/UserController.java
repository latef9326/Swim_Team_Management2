package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.UserUpdateDto;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.infrastructure.UserRole;
import com.example.swim_team_management2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserEntity> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        UserEntity user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> getUsersByRole(
            @RequestParam(name = "role", required = false) UserRole role) {
        if (role == null) {
            return ResponseEntity.ok(userService.findAll());
        }
        return ResponseEntity.ok(userService.findByRole(role));
    }

    @PutMapping("/me")
    public ResponseEntity<UserEntity> updateCurrentUser(
            @Validated @RequestBody UserUpdateDto userUpdateDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        UserEntity updatedUser = userService.updateUserProfile(username, userUpdateDto);

        return ResponseEntity.ok(updatedUser);
    }

    // Nowy endpoint do aktualizacji użytkownika po ID
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.userId")
    public ResponseEntity<UserEntity> updateUserById(
            @PathVariable Long id,
            @Validated @RequestBody UserUpdateDto userUpdateDto) {

        UserEntity updatedUser = userService.updateUserById(id, userUpdateDto);
        return ResponseEntity.ok(updatedUser);
    }
}
