package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.TrainingSessionDto;
import com.example.swim_team_management2.entity.TeamEntity;
import com.example.swim_team_management2.entity.TrainingSessionEntity;
import com.example.swim_team_management2.repository.TeamRepository;
import com.example.swim_team_management2.repository.TrainingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingSessionService {

    private final TrainingSessionRepository trainingSessionRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public TrainingSessionService(TrainingSessionRepository trainingSessionRepository, TeamRepository teamRepository) {
        this.trainingSessionRepository = trainingSessionRepository;
        this.teamRepository = teamRepository;
    }

    public TrainingSessionDto createTrainingSession(TrainingSessionDto dto) {
        TrainingSessionEntity session = new TrainingSessionEntity();
        session.setStartTime(dto.getStartTime());
        session.setEndTime(dto.getEndTime());
        session.setLocation(dto.getLocation());
        session.setTitle(dto.getTitle());
        session.setDescription(dto.getDescription());

        TeamEntity team = teamRepository.findById(dto.getTeamId())
                .orElseThrow(() -> new RuntimeException("Team not found"));
        session.setTeam(team);

        TrainingSessionEntity saved = trainingSessionRepository.save(session);
        return convertToDto(saved);
    }

    private TrainingSessionDto convertToDto(TrainingSessionEntity entity) {
        TrainingSessionDto dto = new TrainingSessionDto();
        dto.setId(entity.getId());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setLocation(entity.getLocation());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setTeamId(entity.getTeam().getId());
        return dto;
    }

    public List<TrainingSessionDto> getAllTrainingSessions() {
        return trainingSessionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
