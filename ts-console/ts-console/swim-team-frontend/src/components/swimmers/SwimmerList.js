import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, CircularProgress, Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import swimmerService from '../../services/swimmerService';

const SwimmerList = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        let data;
        if (currentUser.role === 'SWIMMER') {
          data = [await swimmerService.getSwimmerById(currentUser.id)];
        } else {
          data = await swimmerService.getAllSwimmers();
        }
        setSwimmers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch swimmers');
        setLoading(false);
      }
    };

    fetchSwimmers();
  }, [currentUser]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {swimmers.map((swimmer) => (
            <TableRow key={swimmer.id}>
              <TableCell>{swimmer.firstName} {swimmer.lastName}</TableCell>
              <TableCell>{swimmer.age}</TableCell>
              <TableCell>{swimmer.teamName || 'No team'}</TableCell>
              <TableCell>
                <Button 
                  component={Link} 
                  to={`/swimmers/${swimmer.id}`} 
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

export default SwimmerList;
