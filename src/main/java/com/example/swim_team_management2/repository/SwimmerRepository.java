package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.SwimmerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SwimmerRepository extends JpaRepository<SwimmerEntity, Long> {
}
