package com.example.swim_team_management2.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CompetitionDto {
    private Long id;
    private String name;
    private String location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String description;
    private List<String> categories;
    private List<Long> participatingTeams;

    // Gettery i settery

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Long> getParticipatingTeams() {
        return participatingTeams;
    }

    public void setParticipatingTeams(List<Long> participatingTeams) {
        this.participatingTeams = participatingTeams;
    }
}
