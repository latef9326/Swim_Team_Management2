package com.example.swim_team_management2.security;

import com.example.swim_team_management2.entity.TeamEntity;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class TeamSecurity {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamSecurity(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public boolean isTeamCoach(Long teamId, Authentication authentication) {
        // 1. Pobierz aktualnie zalogowanego użytkownika
        String currentUsername = authentication.getName();

        // 2. Znajdź drużynę po ID
        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // 3. Sprawdź czy użytkownik jest trenerem tej drużyny
        UserEntity coach = team.getCoach();
        return coach != null && coach.getUsername().equals(currentUsername);
    }
}