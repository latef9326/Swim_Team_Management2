import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, Button, Box, Typography, 
  CircularProgress, Alert, MenuItem 
} from '@mui/material';
import teamService from '../../services/teamService';
import coachService from '../../services/coachService';

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    coachId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coachesData = await coachService.getAllCoaches();
        setCoaches(coachesData);
        
        if (id) {
          const team = await teamService.getTeamById(id);
          setFormData({
            name: team.name,
            coachId: team.coachId || ''
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data');
      } finally {
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
      if (id) {
        await teamService.updateTeam(id, formData);
      } else {
        await teamService.createTeam(formData);
      }
      navigate('/teams');
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Failed to save team');
    }
  };

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Team' : 'Add New Team'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Team Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <TextField
        select
        fullWidth
        margin="normal"
        label="Coach"
        name="coachId"
        value={formData.coachId}
        onChange={handleChange}
      >
        <MenuItem value="">Select a coach</MenuItem>
        {coaches.map(coach => (
          <MenuItem key={coach.id} value={coach.id}>
            {coach.firstName} {coach.lastName}
          </MenuItem>
        ))}
      </TextField>
      
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>
          {id ? 'Update' : 'Create'}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/teams')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TeamForm;
