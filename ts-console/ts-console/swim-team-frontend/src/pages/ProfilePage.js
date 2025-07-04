import React, { useState } from 'react';
import { 
  Container, Box, Typography, 
  TextField, Button, Alert, CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: currentUser.email || '',
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    birthDate: currentUser.birthDate || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await userService.updateUser(currentUser.id, formData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
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
            name="birthDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthDate}
            onChange={handleChange}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
          
          <Button 
            variant="outlined" 
            color="error" 
            sx={{ mt: 2, ml: 2 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
