package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.ResultDto;
import com.example.swim_team_management2.entity.CompetitionEntity;
import com.example.swim_team_management2.entity.ResultEntity;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.repository.ResultRepository;
import com.example.swim_team_management2.repository.UserRepository;
import com.example.swim_team_management2.repository.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ResultService {
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;
    private final CompetitionRepository competitionRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository,
                         UserRepository userRepository,
                         CompetitionRepository competitionRepository) {
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
        this.competitionRepository = competitionRepository;
    }

    public ResultDto createResult(ResultDto resultDto) {
        ResultEntity result = new ResultEntity();
        result.setTime(resultDto.getTime());
        result.setPosition(resultDto.getPosition());
        result.setDate(LocalDateTime.now());

        UserEntity swimmer = userRepository.findById(resultDto.getSwimmerId())
                .orElseThrow(() -> new RuntimeException("Swimmer not found"));
        result.setSwimmer(swimmer);

        CompetitionEntity competition = competitionRepository.findById(resultDto.getCompetitionId())
                .orElseThrow(() -> new RuntimeException("Competition not found"));
        result.setCompetition(competition);

        ResultEntity saved = resultRepository.save(result);
        return convertToDto(saved);
    }

    private ResultDto convertToDto(ResultEntity entity) {
        ResultDto dto = new ResultDto();
        dto.setId(entity.getId());
        dto.setTime(entity.getTime());
        dto.setPosition(entity.getPosition());
        dto.setDate(entity.getDate());
        dto.setSwimmerId(entity.getSwimmer().getId());
        dto.setCompetitionId(entity.getCompetition().getId());
        return dto;
    }
}