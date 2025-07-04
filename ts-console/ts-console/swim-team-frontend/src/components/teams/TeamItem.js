import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, CardContent, Typography, 
  Button, Box, Chip 
} from '@mui/material';
import { Groups as TeamIcon } from '@mui/icons-material';

const TeamItem = ({ team }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TeamIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {team.name}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Coach: {team.coachName || 'No coach assigned'}
          </Typography>
          <Chip 
            label={`${team.swimmerCount || 0} swimmers`}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
        
        <Button 
          component={Link}
          to={`/teams/${team.id}`}
          variant="outlined"
          size="small"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamItem;
