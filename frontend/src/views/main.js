import {useState, useEffect, createContext} from 'react';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import Menu from '@mui/material/Menu';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import TicketsGridView from './TicketsGridView';

import {login, logout, getCurrentUser, isUserActive} from '../services/user_session'
import { Input, Stack, TextField } from '@mui/material';
import { getSnacks, getTickets } from '../services';

import  { useNavigate } from 'react-router-dom'

const pages = [
  { title: 'Home', route: '/'},
  { title: 'Manage Booking', route: '/bookings'}
]
const settings = ['Profile', 'Account', 'Booking', 'Logout'];

export const DataContext = createContext({
  movies: [],
  snacks: []
})

export function Main() {

  const [currentUser, setCurrentUser] = useState(null)

  const [tickets, setTickets] = useState([])
  const [snacks, setSnacks] = useState([])
  
  useEffect(() => {
    setCurrentUser(getCurrentUser())
    fetchInit()

  }, [])

  async function fetchInit() {
    const ticketsData = await getTickets()
    console.log('Tickets');
    console.log(ticketsData);
    setTickets(ticketsData)

    const snacksData = await getSnacks()
    setSnacks(snacksData)
  }


  return (
    <DataContext.Provider value={{snacks: snacks}}>
      <Container>
        <Typography align='left' variant='h4'>Welcome {currentUser ? currentUser.name : ''}</Typography>
        <TicketsGridView tickets={tickets ?? []}/>
      </Container>
    </DataContext.Provider>)
}