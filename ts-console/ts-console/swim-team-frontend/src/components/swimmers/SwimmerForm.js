import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, Button, Box, Typography, MenuItem, 
  CircularProgress, Alert 
} from '@mui/material';
import swimmerService from '../../services/swimmerService';
import teamService from '../../services/teamService';

const SwimmerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    teamId: '',
    userId: ''
  });

  // Funkcja do obliczenia wieku na podstawie daty urodzenia
  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await teamService.getAllTeams();
        setTeams(teamsData);
        
        if (id) {
          const swimmer = await swimmerService.getSwimmerById(id);
          setFormData({
            firstName: swimmer.firstName,
            lastName: swimmer.lastName,
            dateOfBirth: swimmer.dateOfBirth,
            teamId: swimmer.team?.id || '',
            userId: swimmer.user?.id || ''
          });
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Oblicz wiek
      const age = calculateAge(formData.dateOfBirth);

      // Znajdź teamName na podstawie teamId
      const selectedTeam = teams.find(team => team.id === formData.teamId);
      const teamName = selectedTeam ? selectedTeam.name : '';

      // Przygotuj dane do wysłania
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: age,
        teamName: teamName
      };

      if (id) {
        await swimmerService.updateSwimmer(id, payload);
      } else {
        await swimmerService.createSwimmer(payload);
      }
      navigate('/swimmers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save swimmer');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">{id ? 'Edit Swimmer' : 'Add New Swimmer'}</Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />
      
      <TextField
        select
        fullWidth
        margin="normal"
        label="Team"
        name="teamId"
        value={formData.teamId}
        onChange={handleChange}
      >
        <MenuItem value="">Select a team</MenuItem>
        {teams.map(team => (
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {id ? 'Update' : 'Create'}
      </Button>
      <Button 
        variant="outlined" 
        sx={{ mt: 2, ml: 2 }}
        onClick={() => navigate('/swimmers')}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default SwimmerForm;
