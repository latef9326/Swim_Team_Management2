package com.example.swim_team_management2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;

public class TeamDto {

    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Long coachId;

    private Set<Long> swimmerIds = new HashSet<>();

    // DODANE POLA (na potrzeby frontendowego widoku)
    private String coachName;  // pełne imię i nazwisko trenera
    private int swimmerCount;

    // --- Gettery i Settery ---

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

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public Set<Long> getSwimmerIds() {
        return swimmerIds;
    }

    public void setSwimmerIds(Set<Long> swimmerIds) {
        this.swimmerIds = swimmerIds;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public int getSwimmerCount() {
        return swimmerCount;
    }

    public void setSwimmerCount(int swimmerCount) {
        this.swimmerCount = swimmerCount;
    }
}
