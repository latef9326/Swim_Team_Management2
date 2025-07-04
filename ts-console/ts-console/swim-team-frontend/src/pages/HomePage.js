import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center', 
        py: 10,
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        borderRadius: 3,
        mt: 4,
        boxShadow: 3
      }}>
        <Typography variant="h2" gutterBottom>
          Swim Team Manager
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Comprehensive solution for managing swimming teams and competitions
        </Typography>
        
        {!isAuthenticated && (
          <Box>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              href="/register"
              sx={{ mr: 2, px: 5, fontSize: '1.1rem' }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              size="large"
              href="/login"
              sx={{ px: 5, fontSize: '1.1rem' }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 8, mb: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 6 }}>
          {[
            { title: 'Team Management', desc: 'Organize swimmers into teams with coaches' },
            { title: 'Training Sessions', desc: 'Schedule and track practice sessions' },
            { title: 'Competitions', desc: 'Manage events and registrations' },
            { title: 'Performance Analytics', desc: 'Track swimmers progress over time' },
          ].map((feature, index) => (
            <Box key={index} sx={{ textAlign: 'center', maxWidth: 250 }}>
              <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4">{index + 1}</Typography>
              </Box>
              <Typography variant="h6" gutterBottom>{feature.title}</Typography>
              <Typography variant="body1">{feature.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;