package com.example.swim_team_management2.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class ResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double time;
    private int position;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "swimmer_id")
    private UserEntity swimmer;

    @ManyToOne
    @JoinColumn(name = "competition_id")
    private CompetitionEntity competition;

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

    public UserEntity getSwimmer() {
        return swimmer;
    }

    public void setSwimmer(UserEntity swimmer) {
        this.swimmer = swimmer;
    }

    public CompetitionEntity getCompetition() {
        return competition;
    }

    public void setCompetition(CompetitionEntity competition) {
        this.competition = competition;
    }
}
