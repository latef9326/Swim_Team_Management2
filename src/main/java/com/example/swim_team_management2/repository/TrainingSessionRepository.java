package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.TrainingSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSessionEntity, Long> {
}