package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.TrainingSessionDto;
import com.example.swim_team_management2.service.TrainingSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
public class TrainingSessionController {

    private final TrainingSessionService trainingSessionService;

    @Autowired
    public TrainingSessionController(TrainingSessionService trainingSessionService) {
        this.trainingSessionService = trainingSessionService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public TrainingSessionDto createTraining(@RequestBody TrainingSessionDto dto) {
        return trainingSessionService.createTrainingSession(dto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public List<TrainingSessionDto> getAllTrainings() {
        return trainingSessionService.getAllTrainingSessions();
    }
}
