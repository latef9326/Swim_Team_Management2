package com.example.swim_team_management2.service;

import com.example.swim_team_management2.entity.CompetitionEntity;
import com.example.swim_team_management2.entity.CompetitionRegistration;
import com.example.swim_team_management2.entity.UserEntity;
import com.example.swim_team_management2.infrastructure.UserRole;
import com.example.swim_team_management2.repository.CompetitionRegistrationRepository;
import com.example.swim_team_management2.repository.CompetitionRepository;
import com.example.swim_team_management2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CompetitionRegistrationService {

    private final CompetitionRegistrationRepository registrationRepository;
    private final CompetitionRepository competitionRepository;
    private final UserRepository userRepository;

    @Autowired
    public CompetitionRegistrationService(CompetitionRegistrationRepository registrationRepository,
                                          CompetitionRepository competitionRepository,
                                          UserRepository userRepository) {
        this.registrationRepository = registrationRepository;
        this.competitionRepository = competitionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void register(Long competitionId, Long swimmerId, String category) {
        // 1. Sprawdź czy zawody istnieją
        CompetitionEntity competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new RuntimeException("Competition not found with id: " + competitionId));

        // 2. Sprawdź czy pływak istnieje i ma odpowiednią rolę
        UserEntity swimmer = userRepository.findById(swimmerId)
                .orElseThrow(() -> new RuntimeException("Swimmer not found with id: " + swimmerId));

        if (swimmer.getRole() != UserRole.SWIMMER) {
            throw new RuntimeException("User is not a swimmer");
        }

        // 3. Sprawdź czy pływak już nie jest zarejestrowany na te zawody
        boolean alreadyRegistered = registrationRepository.existsByCompetitionAndSwimmer(competition, swimmer);
        if (alreadyRegistered) {
            throw new RuntimeException("Swimmer is already registered for this competition");
        }

        // 4. Utwórz nową rejestrację
        CompetitionRegistration registration = new CompetitionRegistration();
        registration.setCompetition(competition);
        registration.setSwimmer(swimmer);
        registration.setCategory(category);

        // 5. Zapisz rejestrację
        registrationRepository.save(registration);
    }

    @Transactional
    public void unregister(Long competitionId, Long swimmerId) {
        CompetitionEntity competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new RuntimeException("Competition not found"));

        UserEntity swimmer = userRepository.findById(swimmerId)
                .orElseThrow(() -> new RuntimeException("Swimmer not found"));

        registrationRepository.deleteByCompetitionAndSwimmer(competition, swimmer);
    }
}