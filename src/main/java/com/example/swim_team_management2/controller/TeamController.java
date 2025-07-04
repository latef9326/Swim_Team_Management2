package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.TeamDto;
import com.example.swim_team_management2.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public TeamDto createTeam(@RequestBody @Valid TeamDto teamDto) {
        return teamService.createTeam(teamDto);
    }

    @GetMapping("/{id}")
    public TeamDto getTeam(@PathVariable Long id) {
        return teamService.getTeam(id);
    }

    @GetMapping
    public ResponseEntity<Page<TeamDto>> getAllTeams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        Page<TeamDto> teams = teamService.getAllTeams(pageable);
        return ResponseEntity.ok(teams);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('COACH') and @teamSecurity.isTeamCoach(#id, principal))")
    public TeamDto updateTeam(@PathVariable Long id, @RequestBody @Valid TeamDto teamDto) {
        return teamService.updateTeam(id, teamDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('COACH') and @teamSecurity.isTeamCoach(#id, principal))")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/details")
    public ResponseEntity<List<TeamDto>> getAllTeamsWithDetails() {
        return ResponseEntity.ok(teamService.getAllTeamsWithDetails());
    }

}
