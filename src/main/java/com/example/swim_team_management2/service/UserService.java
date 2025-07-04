package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.UserUpdateDto;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.infrastructure.UserRole;
import com.example.swim_team_management2.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    public List<UserEntity> findByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    public UserEntity updateUserProfile(String username, UserUpdateDto dto) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setBirthDate(dto.getBirthDate());

        return userRepository.save(user);
    }

    // Nowa metoda do aktualizacji użytkownika po ID
    public UserEntity updateUserById(Long id, UserUpdateDto dto) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setFirstName(dto.getFirstName());
        existingUser.setLastName(dto.getLastName());
        existingUser.setEmail(dto.getEmail());
        existingUser.setBirthDate(dto.getBirthDate());

        return userRepository.save(existingUser);
    }
}
