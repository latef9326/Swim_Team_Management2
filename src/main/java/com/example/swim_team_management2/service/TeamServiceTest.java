//package com.example.swim_team_management2.service;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class TeamServiceTest {
//
//    @Mock
//    private TeamRepository teamRepository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private TeamService teamService;
//
//    @Test
//    void createTeam_ValidData_ReturnsTeamDto() {
//        // Given
//        TeamDto request = new TeamDto();
//        request.setName("Junior Team");
//        request.setCoachId(1L);
//
//        UserEntity coach = new UserEntity();
//        coach.setRole(UserRole.COACH);
//
//        when(userRepository.findById(1L)).thenReturn(Optional.of(coach));
//        when(teamRepository.save(any())).thenReturn(new TeamEntity());
//
//        // When
//        TeamDto result = teamService.createTeam(request);
//
//        // Then
//        assertNotNull(result);
//        verify(teamRepository, times(1)).save(any());
//    }
//}