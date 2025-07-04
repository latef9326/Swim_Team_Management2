package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.infrastructure.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);

    List<UserEntity> findByRole(UserRole role);
}
