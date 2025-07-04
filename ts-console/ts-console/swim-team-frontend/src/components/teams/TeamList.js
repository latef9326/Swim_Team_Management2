import React, { useState, useEffect } from 'react';
import TeamItem from './TeamItem';
import teamService from '../../services/teamService';
import { 
  Box, Typography, Button, 
  CircularProgress, Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const [teams, setTeams]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamService.getAllTeamsWithDetails(); // Użycie nowej metody
        setTeams(data);
      } catch {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
  if (error)   return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Teams</Typography>
        <Button component={Link} to="/teams/new" variant="contained">
          Add New Team
        </Button>
      </Box>

      {teams.length === 0 
        ? <Typography>No teams found</Typography> 
        : teams.map(team => <TeamItem key={team.id} team={team} />)
      }
    </Box>
  );
};

export default TeamList;
