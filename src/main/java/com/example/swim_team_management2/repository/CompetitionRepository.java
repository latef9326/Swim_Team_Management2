package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.CompetitionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionRepository extends JpaRepository<CompetitionEntity, Long> {
}