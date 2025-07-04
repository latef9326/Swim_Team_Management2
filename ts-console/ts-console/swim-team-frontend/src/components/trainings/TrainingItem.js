// TrainingItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardContent, Typography,
  Button, Box, Chip
} from '@mui/material';
import { DirectionsRun as TrainingIcon, Schedule as TimeIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const TrainingItem = ({ training }) => {
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch (e) {
      console.error('Invalid date format:', date);
      return 'Invalid date';
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TrainingIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {training.title || 'Training Session'}
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" gutterBottom>
            {training.description || 'No description provided.'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TimeIcon sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(training.startTime)} - {formatDate(training.endTime)}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Location: {training.location}
          </Typography>

          {training.team?.name && (
            <Chip
              label={`Team: ${training.team.name}`}
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <Button
          component={Link}
          to={`/trainings/${training.id}`}
          variant="outlined"
          size="small"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingItem;
