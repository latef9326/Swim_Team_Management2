package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.CompetitionDto;
import com.example.swim_team_management2.entity.CompetitionEntity;
import com.example.swim_team_management2.entity.TeamEntity;
import com.example.swim_team_management2.repository.CompetitionRepository;
import com.example.swim_team_management2.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public CompetitionService(CompetitionRepository competitionRepository, TeamRepository teamRepository) {
        this.competitionRepository = competitionRepository;
        this.teamRepository = teamRepository;
    }

    public CompetitionDto createCompetition(CompetitionDto competitionDto) {
        CompetitionEntity competition = new CompetitionEntity();
        updateEntityFromDto(competition, competitionDto);
        CompetitionEntity saved = competitionRepository.save(competition);
        return convertToDto(saved);
    }

    public CompetitionDto updateCompetition(Long id, CompetitionDto competitionDto) {
        CompetitionEntity competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competition not found"));
        updateEntityFromDto(competition, competitionDto);
        CompetitionEntity updated = competitionRepository.save(competition);
        return convertToDto(updated);
    }

    public void deleteCompetition(Long id) {
        if (!competitionRepository.existsById(id)) {
            throw new RuntimeException("Competition not found");
        }
        competitionRepository.deleteById(id);
    }

    public List<CompetitionDto> getAllCompetitions() {
        return competitionRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private void updateEntityFromDto(CompetitionEntity entity, CompetitionDto dto) {
        entity.setName(dto.getName());
        entity.setLocation(dto.getLocation());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDescription(dto.getDescription());
        entity.setCategories(dto.getCategories());

        if (dto.getParticipatingTeams() != null) {
            Set<TeamEntity> teams = dto.getParticipatingTeams().stream()
                    .map(teamId -> teamRepository.findById(teamId)
                            .orElseThrow(() -> new RuntimeException("Team not found: " + teamId)))
                    .collect(Collectors.toSet());
            entity.setParticipatingTeams(teams);
        } else {
            entity.getParticipatingTeams().clear();
        }
    }

    private CompetitionDto convertToDto(CompetitionEntity entity) {
        CompetitionDto dto = new CompetitionDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLocation(entity.getLocation());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setDescription(entity.getDescription());
        dto.setCategories(entity.getCategories());

        dto.setParticipatingTeams(
                entity.getParticipatingTeams().stream()
                        .map(TeamEntity::getId)
                        .collect(Collectors.toList())
        );

        return dto;
    }
}
