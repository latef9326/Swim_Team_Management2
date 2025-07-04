// src/components/Training/TrainingForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField, Button, Box, Typography,
  CircularProgress, Alert, MenuItem,
  InputLabel, Select, FormControl
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trainingService from '../../services/trainingService';
import teamService from '../../services/teamService';

const TrainingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    teamId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await teamService.getAllTeams();
        setTeams(teamsData);

        if (id) {
          const training = await trainingService.getTrainingById(id);
          setFormData({
            title: training.title || '',
            description: training.description || '',
            location: training.location,
            startTime: new Date(training.startTime),
            endTime: new Date(training.endTime),
            teamId: training.team?.id || ''
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startTime: formData.startTime,
      endTime: formData.endTime,
      teamId: formData.teamId
    };

    try {
      if (id) {
        await trainingService.updateTraining(id, payload);
      } else {
        await trainingService.createTraining(payload);
      }
      navigate('/trainings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save training');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">{id ? 'Edit Training' : 'Add New Training'}</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
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

      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Team</InputLabel>
        <Select
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
          label="Team"
          required
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Start Time"
          value={formData.startTime}
          onChange={(date) => handleTimeChange('startTime', date)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />

        <DateTimePicker
          label="End Time"
          value={formData.endTime}
          onChange={(date) => handleTimeChange('endTime', date)}
          minDateTime={formData.startTime}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
      </LocalizationProvider>

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          {id ? 'Update' : 'Create'}
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate('/trainings')}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TrainingForm;
