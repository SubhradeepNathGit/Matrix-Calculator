import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        px: 2,
        backgroundColor: 'rgba(115, 115, 115, 1)', // gray background
        textAlign: 'center',
        color: 'white', // applies to all nested text
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Developed by Subhradeep Nath. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
