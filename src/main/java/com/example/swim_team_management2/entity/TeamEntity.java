package com.example.swim_team_management2.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "teams")
public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private UserEntity coach;

    @ManyToMany
    @JoinTable(
            name = "team_swimmers",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id") // Zmienione z 'swimmer_id' na 'user_id'
    )
    private Set<UserEntity> swimmers = new HashSet<>();

    // Konstruktory
    public TeamEntity() {
    }

    public TeamEntity(String name, UserEntity coach) {
        this.name = name;
        this.coach = coach;
    }

    // Gettery i Settery
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

    public UserEntity getCoach() {
        return coach;
    }

    public void setCoach(UserEntity coach) {
        this.coach = coach;
    }

    public Set<UserEntity> getSwimmers() {
        return swimmers;
    }

    public void setSwimmers(Set<UserEntity> swimmers) {
        this.swimmers = swimmers;
    }

    // Metody pomocnicze
    public void addSwimmer(UserEntity swimmer) {
        this.swimmers.add(swimmer);
        swimmer.getTeams().add(this);
    }

    public void removeSwimmer(UserEntity swimmer) {
        this.swimmers.remove(swimmer);
        swimmer.getTeams().remove(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamEntity team = (TeamEntity) o;
        return Objects.equals(id, team.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "TeamEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", coach=" + (coach != null ? coach.getUsername() : "null") +
                '}';
    }
}