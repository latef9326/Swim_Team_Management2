package com.example.swim_team_management2.service;

import com.example.swim_team_management2.dto.SwimmerDto;
import com.example.swim_team_management2.entity.SwimmerEntity;
import com.example.swim_team_management2.mapper.SwimmerMapper;
import com.example.swim_team_management2.repository.SwimmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SwimmerService {

    private final SwimmerRepository swimmerRepository;

    @Autowired
    public SwimmerService(SwimmerRepository swimmerRepository) {
        this.swimmerRepository = swimmerRepository;
    }

    public SwimmerDto updateSwimmer(Long id, SwimmerDto dto) {
        SwimmerEntity entity = swimmerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Swimmer not found"));

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setAge(dto.getAge());
        entity.setTeamName(dto.getTeamName());

        SwimmerEntity updated = swimmerRepository.save(entity);
        return SwimmerMapper.toDto(updated);
    }

    public SwimmerDto createSwimmer(SwimmerDto dto) {
        SwimmerEntity entity = SwimmerMapper.toEntity(dto);
        SwimmerEntity saved = swimmerRepository.save(entity);
        return SwimmerMapper.toDto(saved);
    }
    public List<SwimmerDto> getAllSwimmers() {
        return swimmerRepository.findAll()
                .stream()
                .map(SwimmerMapper::toDto)
                .collect(Collectors.toList());
    }
}

