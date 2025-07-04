import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import Login from '../components/auth/Login';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
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
          Sign in to access your dashboard
        </Typography>
        
        <Login />
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" color="secondary">
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;