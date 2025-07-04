import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, 
  FormGroup, FormControlLabel, Checkbox, 
  CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import swimmerService from './swimmerService';




const RegistrationForm = ({ competitionId, categories, onRegister, onCancel }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [swimmerId, setSwimmerId] = useState('');
  const [swimmers, setSwimmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const data = await swimmerService.getAllSwimmers();
        setSwimmers(data);
      } catch (err) {
        setError('Failed to load swimmers');
      }
    };
    
    fetchSwimmers();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSubmit = async () => {
    if (!swimmerId || selectedCategories.length === 0) {
      setError('Please select a swimmer and at least one category');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await onRegister(swimmerId, selectedCategories);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ p: 3, border: '1px solid #ddd', borderRadius: 1, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Register Swimmer
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Swimmer</InputLabel>
        <Select
          value={swimmerId}
          onChange={(e) => setSwimmerId(e.target.value)}
          label="Select Swimmer"
          required
        >
          {swimmers.map(swimmer => (
            <MenuItem key={swimmer.id} value={swimmer.id}>
              {swimmer.firstName} {swimmer.lastName} ({swimmer.team?.name || 'No team'})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" gutterBottom>
        Select Categories:
      </Typography>
      
      <FormGroup row>
        {categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox 
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;