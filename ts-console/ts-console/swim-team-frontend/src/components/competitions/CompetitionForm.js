import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, Button, Box, Typography, 
  CircularProgress, Alert, MenuItem,
  InputLabel, Select, FormControl,
  FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import competitionService from '../../services/competitionService';
import teamService from '../../services/teamService';
import Chip from '@mui/material/Chip';

const CompetitionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    categories: [],
    participatingTeams: []
  });

  const categories = [
    'Freestyle 50m',
    'Freestyle 100m',
    'Freestyle 200m',
    'Butterfly 50m',
    'Butterfly 100m',
    'Backstroke 50m',
    'Backstroke 100m',
    'Breaststroke 50m',
    'Breaststroke 100m',
    'Medley 200m'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await teamService.getAllTeams();
        setTeams(teamsData);
        
        if (id) {
          const competition = await competitionService.getCompetitionById(id);
          setFormData({
            name: competition.name,
            location: competition.location,
            startDate: new Date(competition.startDate),
            endDate: new Date(competition.endDate),
            description: competition.description,
            categories: competition.categories,
            participatingTeams: competition.participatingTeams.map(t => t.id)
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

  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...prev.categories, category] };
      }
    });
  };

  const handleTeamChange = (teamId) => {
    setFormData(prev => {
      if (prev.participatingTeams.includes(teamId)) {
        return { ...prev, participatingTeams: prev.participatingTeams.filter(id => id !== teamId) };
      } else {
        return { ...prev, participatingTeams: [...prev.participatingTeams, teamId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (id) {
        await competitionService.updateCompetition(id, formData);
      } else {
        await competitionService.createCompetition(formData);
      }
      navigate('/competitions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save competition');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">{id ? 'Edit Competition' : 'Add New Competition'}</Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Competition Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        multiline
        rows={3}
        value={formData.description}
        onChange={handleChange}
      />
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Start Date & Time"
          value={formData.startDate}
          onChange={(date) => handleDateChange('startDate', date)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
        
        <DateTimePicker
          label="End Date & Time"
          value={formData.endDate}
          onChange={(date) => handleDateChange('endDate', date)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          minDateTime={formData.startDate}
        />
      </LocalizationProvider>
      
      <FormControl fullWidth margin="normal">
        <Typography variant="subtitle1" gutterBottom>Categories</Typography>
        <FormGroup row>
          {categories.map(category => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox 
                  checked={formData.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <Typography variant="subtitle1" gutterBottom>Participating Teams</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {teams.map(team => (
            <Chip
              key={team.id}
              label={team.name}
              color={formData.participatingTeams.includes(team.id) ? 'primary' : 'default'}
              onClick={() => handleTeamChange(team.id)}
              clickable
            />
          ))}
        </Box>
      </FormControl>
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {id ? 'Update' : 'Create'}
      </Button>
      <Button 
        variant="outlined" 
        sx={{ mt: 2, ml: 2 }}
        onClick={() => navigate('/competitions')}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default CompetitionForm;