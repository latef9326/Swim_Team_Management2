import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SwimmerItem = ({ swimmer }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {swimmer.firstName} {swimmer.lastName}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Date of Birth: {new Date(swimmer.dateOfBirth).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {swimmer.age}
          </Typography>

          <Chip 
            label={`Team: ${swimmer.teamName || 'No team'}`}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        <Button 
          component={Link}
          to={`/swimmers/${swimmer.id}`}
          variant="outlined"
          size="small"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SwimmerItem;
