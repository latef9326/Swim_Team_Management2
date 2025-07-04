package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.TeamDto;
import com.example.swim_team_management2.entity.TeamEntity;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.infrastructure.UserRole;
import com.example.swim_team_management2.repository.TeamRepository;
import com.example.swim_team_management2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    public TeamDto createTeam(TeamDto teamDto) {
        UserEntity coach = userRepository.findById(teamDto.getCoachId())
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        if (coach.getRole() != UserRole.COACH) {
            throw new RuntimeException("User is not a coach");
        }

        TeamEntity team = new TeamEntity();
        team.setName(teamDto.getName());
        team.setCoach(coach);

        Set<UserEntity> swimmers = new HashSet<>();
        for (Long swimmerId : teamDto.getSwimmerIds()) {
            UserEntity swimmer = userRepository.findById(swimmerId)
                    .orElseThrow(() -> new RuntimeException("Swimmer not found: " + swimmerId));
            if (swimmer.getRole() != UserRole.SWIMMER) {
                throw new RuntimeException("User is not a swimmer: " + swimmerId);
            }
            swimmers.add(swimmer);
        }

        team.setSwimmers(swimmers);

        TeamEntity savedTeam = teamRepository.save(team);
        return convertToDto(savedTeam);
    }

    public TeamDto getTeam(Long id) {
        TeamEntity team = teamRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return convertToDto(team);
    }

    public List<TeamDto> getAllTeamsWithDetails() {
        List<TeamEntity> teams = teamRepository.findAllWithDetails();
        return teams.stream().map(this::convertToDto).toList();
    }

    public Page<TeamDto> getAllTeams(Pageable pageable) {
        return teamRepository.findAll(pageable)
                .map(this::convertToDto);
    }

    public TeamDto updateTeam(Long id, TeamDto teamDto) {
        TeamEntity team = teamRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setName(teamDto.getName());

        if (teamDto.getCoachId() != null && !teamDto.getCoachId().equals(team.getCoach().getId())) {
            UserEntity newCoach = userRepository.findById(teamDto.getCoachId())
                    .orElseThrow(() -> new RuntimeException("Coach not found"));
            if (newCoach.getRole() != UserRole.COACH) {
                throw new RuntimeException("User is not a coach");
            }
            team.setCoach(newCoach);
        }

        Set<UserEntity> currentSwimmers = team.getSwimmers();
        Set<Long> newSwimmerIds = teamDto.getSwimmerIds();

        // Usuń pływaków, którzy zostali odznaczeni
        currentSwimmers.removeIf(swimmer -> !newSwimmerIds.contains(swimmer.getId()));

        // Dodaj nowych pływaków
        for (Long swimmerId : newSwimmerIds) {
            if (currentSwimmers.stream().noneMatch(s -> s.getId().equals(swimmerId))) {
                UserEntity swimmer = userRepository.findById(swimmerId)
                        .orElseThrow(() -> new RuntimeException("Swimmer not found: " + swimmerId));
                if (swimmer.getRole() != UserRole.SWIMMER) {
                    throw new RuntimeException("User is not a swimmer: " + swimmerId);
                }
                currentSwimmers.add(swimmer);
            }
        }

        TeamEntity updated = teamRepository.save(team);
        return convertToDto(updated);
    }

    public void deleteTeam(Long id) {
        if (!teamRepository.existsById(id)) {
            throw new RuntimeException("Team not found");
        }
        teamRepository.deleteById(id);
    }

    private TeamDto convertToDto(TeamEntity team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());

        if (team.getCoach() != null) {
            dto.setCoachId(team.getCoach().getId());
            dto.setCoachName(team.getCoach().getFirstName() + " " + team.getCoach().getLastName()); // Dodano coachName
        }

        Set<Long> swimmerIds = new HashSet<>();
        if (team.getSwimmers() != null) {
            for (UserEntity swimmer : team.getSwimmers()) {
                swimmerIds.add(swimmer.getId());
            }
        }

        dto.setSwimmerIds(swimmerIds);
        dto.setSwimmerCount(swimmerIds.size()); // Dodano swimmerCount

        return dto;
    }

}
