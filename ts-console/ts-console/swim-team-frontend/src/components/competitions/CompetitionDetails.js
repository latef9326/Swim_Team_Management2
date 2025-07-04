import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Chip, 
  CircularProgress, Alert, Paper, Grid, 
  List, ListItem, ListItemText, Divider 
} from '@mui/material';
import { EmojiEvents, Place, Event } from '@mui/icons-material';
import { format, toZonedTime } from 'date-fns-tz';
import competitionService from '../../services/competitionService';
import RegistrationForm from '../../services/RegistrationForm';
import { useAuth } from '../../context/AuthContext';

const CompetitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const data = await competitionService.getCompetitionById(id);
        setCompetition(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch competition details');
        setLoading(false);
      }
    };
    
    fetchCompetition();
  }, [id]);

  const handleRegister = async (swimmerId, categories) => {
    try {
      await competitionService.registerSwimmer(id, swimmerId, categories);
      // Odśwież dane po rejestracji
      const updated = await competitionService.getCompetitionById(id);
      setCompetition(updated);
      setShowRegistration(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!competition) return <Typography>Competition not found</Typography>;

  // Formatowanie dat w strefie Europe/Warsaw
  const timeZone = 'Europe/Warsaw';
  const startDateZoned = toZonedTime(competition.startDate, timeZone);
  const endDateZoned = toZonedTime(competition.endDate, timeZone);

  const formattedStartDate = format(startDateZoned, "dd.MM.yyyy HH:mm:ss");
  const formattedEndDate = format(endDateZoned, "dd.MM.yyyy HH:mm:ss");

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate('/competitions')} sx={{ mb: 2 }}>
        Back to Competitions
      </Button>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1 }} />
          {competition.name}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Place sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>{competition.location}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Event sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>
                {formattedStartDate} - {formattedEndDate}
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              {competition.description}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Categories:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {competition.categories.map(category => (
                <Chip key={category} label={category} color="primary" />
              ))}
            </Box>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Participating Teams:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {competition.participatingTeams.map(team => (
                <Chip 
                  key={team.id} 
                  label={team.name} 
                  variant="outlined" 
                  color="secondary" 
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Registrations</Typography>
        {currentUser.role === 'SWIMMER' && !showRegistration && (
          <Button 
            variant="contained" 
            onClick={() => setShowRegistration(true)}
          >
            Register for Competition
          </Button>
        )}
      </Box>
      
      {showRegistration && (
        <RegistrationForm 
          competitionId={id}
          categories={competition.categories}
          onRegister={handleRegister}
          onCancel={() => setShowRegistration(false)}
        />
      )}
      
      {competition.registrations && competition.registrations.length > 0 ? (
        <List component={Paper}>
          {competition.registrations.map(registration => (
            <React.Fragment key={registration.id}>
              <ListItem>
                <ListItemText
                  primary={`${registration.swimmer.firstName} ${registration.swimmer.lastName}`}
                  secondary={
                    <Box>
                      <Typography component="span">Team: {registration.swimmer.team?.name || 'No team'}</Typography>
                      <br />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {registration.categories.map(cat => (
                          <Chip key={cat} label={cat} size="small" />
                        ))}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          No registrations yet
        </Typography>
      )}
    </Box>
  );
};

export default CompetitionDetails;
