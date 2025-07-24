import { AppBar, Box, Button, Stack, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenService } from '../services/tokenService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = tokenService.isLoggedIn();
  const user = tokenService.getUser(); // Assumes you have a getUser() that returns user info (e.g., name)
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    tokenService.removeToken();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic or navigation here
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: App Name */}
        <Typography variant="h6" component={Link} to="/books" sx={{ color: 'inherit', textDecoration: 'none', mr: 4 }}>
          BookNexus
        </Typography>
        {/* Spacer to push nav links to the right */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Center/Right: Navigation Links */}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/books">Books</Button>
          {isLoggedIn && <Button color="inherit" component={Link} to="/my-books">My Books</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/borrowed-books">Borrowed Books</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/tbr">TBR</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/read">Read</Button>}
          {isLoggedIn && <Button color="inherit" component={Link} to="/add-book">Add Book</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/register">Register</Button>}
          {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Stack>
        {/* Right: Search bar and Welcome */}
        {isLoggedIn && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
            <Box component="form" onSubmit={handleSearch} sx={{ mr: 2 }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ bgcolor: 'background.paper', borderRadius: 1, minWidth: 150 }}
                InputProps={{ sx: { height: 36 } }}
              />
            </Box>
            <Typography variant="body1" sx={{ color: 'inherit', whiteSpace: 'nowrap' }}>
              Welcome {user?.name || user?.email || 'User'}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 