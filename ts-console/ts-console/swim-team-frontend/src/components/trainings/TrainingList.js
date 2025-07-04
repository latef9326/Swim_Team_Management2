import React, { useState, useEffect } from 'react';
import { 
  Box, CircularProgress, Alert, 
  Typography, Button, MenuItem, TextField
} from '@mui/material';
import TrainingItem from './TrainingItem';
import { useAuth } from '../../context/AuthContext';
import trainingService from '../../services/trainingService';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('upcoming');
  const { currentUser } = useAuth();

 useEffect(() => {
  const fetchTrainings = async () => {
    try {
      let data;
      if (currentUser.role === 'SWIMMER') {
        data = await trainingService.getTrainingsForSwimmer(currentUser.id);
      } else {
        data = await trainingService.getAllTrainings();
      }

      data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      console.log('Fetched trainings:', data); 
      setTrainings(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trainings');
      setLoading(false);
    }
  };

  fetchTrainings();
}, [currentUser]);


  const filteredTrainings = trainings.filter(training => {
    const now = new Date();
    const startTime = new Date(training.startTime);
    
    if (filter === 'upcoming') return startTime > now;
    if (filter === 'past') return startTime < now;
    return true;
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Training Sessions</Typography>
        
        <TextField
          select
          label="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Trainings</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="past">Past</MenuItem>
        </TextField>
      </Box>

      {filteredTrainings.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No trainings found
        </Typography>
      ) : (
        filteredTrainings.map(training => (
          <TrainingItem key={training.id} training={training} />
        ))
      )}
    </Box>
  );
};

export default TrainingList;