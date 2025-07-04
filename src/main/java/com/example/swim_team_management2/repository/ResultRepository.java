package com.example.swim_team_management2.repository;

import com.example.swim_team_management2.entity.ResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<ResultEntity, Long> {
}