import React from 'react';
import { Container, Typography, Box, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6">User Information</Typography>
              <Typography>Username: {currentUser?.username}</Typography>
              <Typography>Role: {currentUser?.role}</Typography>
              <Typography>Email: {currentUser?.email}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6">Quick Actions</Typography>
              <Typography>
                <MuiLink component={Link} to="/profile" underline="hover" sx={{ cursor: 'pointer' }}>
                  View your profile
                </MuiLink>
              </Typography>
              <Typography>
                <MuiLink component={Link} to="/trainings" underline="hover" sx={{ cursor: 'pointer' }}>
                  Check upcoming trainings
                </MuiLink>
              </Typography>
              <Typography>
                <MuiLink component={Link} to="/competitions" underline="hover" sx={{ cursor: 'pointer' }}>
                  See competition schedule
                </MuiLink>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
