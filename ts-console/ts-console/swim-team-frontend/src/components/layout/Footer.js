import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      px: 2, 
      mt: 'auto', 
      backgroundColor: 'primary.main', 
      color: 'white' 
    }}>
      <Typography variant="body2" align="center">
        Swim Team Management System &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;