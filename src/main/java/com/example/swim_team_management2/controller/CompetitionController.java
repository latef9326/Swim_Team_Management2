package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.CompetitionDto;
import com.example.swim_team_management2.service.CompetitionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CompetitionDto createCompetition(@RequestBody @Valid CompetitionDto competitionDto) {
        return competitionService.createCompetition(competitionDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CompetitionDto updateCompetition(@PathVariable Long id, @RequestBody @Valid CompetitionDto competitionDto) {
        return competitionService.updateCompetition(id, competitionDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCompetition(@PathVariable Long id) {
        competitionService.deleteCompetition(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH') or hasRole('SWIMMER')")
    public List<CompetitionDto> getAllCompetitions() {
        return competitionService.getAllCompetitions();
    }
}
