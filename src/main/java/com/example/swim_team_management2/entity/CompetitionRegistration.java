package com.example.swim_team_management2.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "competition_registrations")
public class CompetitionRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "competition_id", nullable = false)
    private CompetitionEntity competition;

    @ManyToOne
    @JoinColumn(name = "swimmer_id", nullable = false)
    private UserEntity swimmer;

    @Column(nullable = false)
    private String category; // np. "100m dowolnym"

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CompetitionEntity getCompetition() {
        return competition;
    }

    public void setCompetition(CompetitionEntity competition) {
        this.competition = competition;
    }

    public UserEntity getSwimmer() {
        return swimmer;
    }

    public void setSwimmer(UserEntity swimmer) {
        this.swimmer = swimmer;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}