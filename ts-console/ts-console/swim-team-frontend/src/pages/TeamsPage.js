import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TeamList from '../components/teams/TeamList';
import { useAuth } from '../context/AuthContext';

const TeamsPage = () => {
  const { currentUser } = useAuth();
  const canEdit = ['ADMIN', 'COACH'].includes(currentUser.role);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Teams</Typography>
        {canEdit && (
          <Button 
            component={Link} 
            to="/teams/new" 
            variant="contained" 
            color="primary"
          >
            Add New Team
          </Button>
        )}
      </Box>
      <TeamList />
    </Container>
  );
};

export default TeamsPage;