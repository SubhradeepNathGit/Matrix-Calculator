import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rebeccapurple', // violet/navy-violet tone
        color: '#fff',
      }}
      elevation={4}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left - Title */}
        <Typography variant="h6" component="div" fontWeight={700}>
          Matrix Calculator
        </Typography>

        {/* Right - Home Button only */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
