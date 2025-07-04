import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SwimmerList from '../components/swimmers/SwimmerList';
import { useAuth } from '../context/AuthContext';

const SwimmersPage = () => {
  const { currentUser } = useAuth();
  const canEdit = ['ADMIN', 'COACH'].includes(currentUser.role);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Swimmers</Typography>
        {canEdit && (
          <Button 
            component={Link} 
            to="/swimmers/new" 
            variant="contained" 
            color="primary"
          >
            Add New Swimmer
          </Button>
        )}
      </Box>
      <SwimmerList />
    </Container>
  );
};

export default SwimmersPage;