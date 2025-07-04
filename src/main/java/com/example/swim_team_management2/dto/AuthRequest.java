package com.example.swim_team_management2.dto;

import com.example.swim_team_management2.infrastructure.UserRole;

public class AuthRequest {
    private String username;
    private String password;
    private UserRole role; // <--- DODANE

    // Gettery i settery
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
