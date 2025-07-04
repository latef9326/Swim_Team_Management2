package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.CompetitionRegistrationDto;
import com.example.swim_team_management2.service.CompetitionRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registrations")
public class CompetitionRegistrationController {

    private final CompetitionRegistrationService registrationService;

    @Autowired
    public CompetitionRegistrationController(CompetitionRegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public ResponseEntity<Void> registerSwimmer(@RequestBody CompetitionRegistrationDto dto) {
        registrationService.register(dto.getCompetitionId(), dto.getSwimmerId(), dto.getCategory());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public ResponseEntity<Void> unregisterSwimmer(@RequestBody CompetitionRegistrationDto dto) {
        registrationService.unregister(dto.getCompetitionId(), dto.getSwimmerId());
        return ResponseEntity.noContent().build();
    }
}
