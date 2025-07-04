package com.example.swim_team_management2.mapper;

import com.example.swim_team_management2.dto.SwimmerDto;
import com.example.swim_team_management2.entity.SwimmerEntity;

public class SwimmerMapper {

    public static SwimmerDto toDto(SwimmerEntity entity) {
        SwimmerDto dto = new SwimmerDto();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setAge(entity.getAge());
        dto.setTeamName(entity.getTeamName());
        return dto;
    }

    public static SwimmerEntity toEntity(SwimmerDto dto) {
        SwimmerEntity entity = new SwimmerEntity();
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setAge(dto.getAge());
        entity.setTeamName(dto.getTeamName());
        return entity;
    }
}

