import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Swim Team Manager
          </Typography>
          
          {isAuthenticated && (
            <>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {currentUser?.username} ({currentUser?.role})
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;