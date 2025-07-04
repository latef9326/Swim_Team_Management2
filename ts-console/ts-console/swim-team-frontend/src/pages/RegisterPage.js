import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import Register from '../components/auth/Register';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Swim Team Management System
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Create a new account
        </Typography>
        
        <Register />
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" color="secondary">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;