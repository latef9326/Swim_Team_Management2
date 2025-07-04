package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.CompetitionEntity;
import com.example.swim_team_management2.entity.CompetitionRegistration;
import com.example.swim_team_management2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRegistrationRepository extends JpaRepository<CompetitionRegistration, Long> {
    boolean existsByCompetitionAndSwimmer(CompetitionEntity competition, UserEntity swimmer);
    void deleteByCompetitionAndSwimmer(CompetitionEntity competition, UserEntity swimmer);
}