import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TrainingList from '../components/trainings/TrainingList';
import { useAuth } from '../context/AuthContext';

const TrainingsPage = () => {
  const { currentUser } = useAuth();
  const canEdit = ['ADMIN', 'COACH'].includes(currentUser.role);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Training Sessions</Typography>
        {canEdit && (
          <Button 
            component={Link} 
            to="/trainings/new" 
            variant="contained" 
            color="primary"
          >
            Schedule New Training
          </Button>
        )}
      </Box>
      <TrainingList />
    </Container>
  );
};

export default TrainingsPage;