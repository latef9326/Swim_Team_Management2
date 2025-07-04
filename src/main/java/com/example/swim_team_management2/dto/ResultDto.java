package com.example.swim_team_management2.dto;

import java.time.LocalDateTime;

public class ResultDto {

    private Long id;
    private double time;
    private int position;
    private LocalDateTime date;
    private Long swimmerId;
    private Long competitionId;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Long getSwimmerId() {
        return swimmerId;
    }

    public void setSwimmerId(Long swimmerId) {
        this.swimmerId = swimmerId;
    }

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
    }
}
