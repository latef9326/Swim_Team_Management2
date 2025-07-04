import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, MenuItem } from '@mui/material';
import { register as authRegister } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'SWIMMER',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authRegister(userData);
      // response.token powinno istnieć po zmianach backendu
      login(response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <Box sx={{ 
      p: 4, 
      boxShadow: 3, 
      borderRadius: 2,
      backgroundColor: 'background.paper',
      maxWidth: 400,
      mx: 'auto'
    }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          select
          value={userData.role}
          onChange={handleChange}
          required
        >
          <MenuItem value="SWIMMER">Swimmer</MenuItem>
          <MenuItem value="COACH">Coach</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={userData.lastName}
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
          value={userData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
