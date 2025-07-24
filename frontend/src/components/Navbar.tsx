import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenService } from '../services/tokenService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = tokenService.isLoggedIn();

  const handleLogout = () => {
    tokenService.removeToken();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/books" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          BookNexus
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/books">Books</Button>
          {isLoggedIn && <Button color="inherit" component={Link} to="/my-books">My Books</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/borrowed-books">Borrowed Books</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/add-book">Add Book</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/register">Register</Button>}
          {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 