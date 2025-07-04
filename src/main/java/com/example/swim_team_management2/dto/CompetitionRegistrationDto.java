package com.example.swim_team_management2.dto;

public class CompetitionRegistrationDto {
    private Long competitionId;
    private Long swimmerId;
    private String category;

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
    }

    public Long getSwimmerId() {
        return swimmerId;
    }

    public void setSwimmerId(Long swimmerId) {
        this.swimmerId = swimmerId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
