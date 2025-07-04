import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Typography, Box, CircularProgress, Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';
import competitionService from '../../services/competitionService';

const CompetitionList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await competitionService.getAllCompetitions();
        setCompetitions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch competitions');
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Teams</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competitions.map((competition) => (
            <TableRow key={competition.id}>
              <TableCell>{competition.name}</TableCell>
              <TableCell>{competition.location}</TableCell>
              <TableCell>{new Date(competition.startDate).toLocaleString()}</TableCell>
              <TableCell>{new Date(competition.endDate).toLocaleString()}</TableCell>
              <TableCell>{competition.participatingTeams.length}</TableCell>
              <TableCell>
                <Button 
                  component={Link} 
                  to={`/competitions/${competition.id}`} 
                  variant="outlined" 
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompetitionList;