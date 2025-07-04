package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
    @Query("SELECT t FROM TeamEntity t LEFT JOIN FETCH t.coach LEFT JOIN FETCH t.swimmers WHERE t.id = :id")
    Optional<TeamEntity> findByIdWithRelations(@Param("id") Long id);

    @Query("SELECT DISTINCT t FROM TeamEntity t LEFT JOIN FETCH t.coach LEFT JOIN FETCH t.swimmers")
    List<TeamEntity> findAllWithDetails();
}
