import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Dashboard,
  People,
  Groups,
  DirectionsRun,
  ExitToApp,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Swimmers', icon: <People />, path: '/swimmers' },
    { text: 'Teams', icon: <Groups />, path: '/teams' },
    { text: 'Trainings', icon: <DirectionsRun />, path: '/trainings' },
    { text: 'Competitions', icon: <EmojiEventsIcon />, path: '/competitions' }, // ✅ dodane
    { text: 'My Profile', icon: <ProfileIcon />, path: '/profile' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navigation;
