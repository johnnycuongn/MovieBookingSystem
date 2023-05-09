import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
  import IconButton from '@mui/material/IconButton';
  import MenuIcon from '@mui/icons-material/Menu';
import { Stack, TextField } from '@mui/material';

import Menu from '@mui/material/Menu';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getCurrentUser, login, logout, isUserActive } from '../services/user_session';

const pages = [
  { title: 'Home', route: '/'},
  { title: 'Manage Booking', route: '/bookings'}
]


export default function AppNavigationBar() {

  const [usernameInputVal, setUsernameInputVal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  const navigate = useNavigate()

  const handleUserLogin = () => {
    if (usernameInputVal.trim().length === 0) return

    const success = login(usernameInputVal)
    if (success) {
      window.location.reload()
    } else {
      console.log('Unable to login');
    }
  }

  const handleUserLogout = () => {
    if (isUserActive()) {
      const success = logout()
      if (success) window.location.reload()
    }
  }

  return (
  <Container maxWidth="xl">
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {currentUser ? currentUser.name : ''}
          </Typography>
          <Box sx={{ flexGrow: 1, flexDirection: 'row' }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => navigate(page.route)}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isUserActive() ? 
            <Stack direction={'row'}>
              <Button sx={{ color: 'white', display: 'block' }} onClick={handleUserLogout}>
                Logout
              </Button>
            </Stack>
            : 
            <Stack direction={'row'}>
              <TextField label="Username" variant='outlined' sx={{ backgroundColor: 'white'}}
                  value={usernameInputVal}
                  onChange={(e) => setUsernameInputVal(e.target.value)}  
              />
              <Button sx={{ color: 'white', display: 'block' }} onClick={handleUserLogin}>Login</Button>
            </Stack>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Outlet />
  </Container>)
}