import {useContext, useEffect, useState} from 'react'
import {
   Typography, Box, Modal, FormControl, Input, InputLabel, Select, MenuItem, Button, Stack, LinearProgress
} from '@mui/material';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from './main';
import { makeBooking } from '../services';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const seatAvailable = [
  '1a',
  '2a',
  '3a',
  '4a',
  '1b',
  '2b',
  '3b',
  '4b',
  '1c',
  '2c',
  '3c',
  '4c'
]

export default function TicketBookingModal({ticket, open, handleClose}) {

  const [date, setDate] = useState(new Date());

  const { snacks } = useContext(DataContext)

  const [chosenSeat, setChosenSeat] = useState('')
  const [chosenSnack, setChosenSnack] = useState('')
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  }, [])

  async function bookingBtnClick() {
    console.log('Chosen snacks' + JSON.stringify(chosenSnack));
    setLoading(true)
    const bookingData = {
      ticket_id: ticket.id,
      seat: chosenSeat,
      snack_id: chosenSnack, 
    }

    console.log(bookingData);

    try {
      await makeBooking(bookingData)
    }
    catch (e) {
      console.log(e);
    } finally {
      setLoading(true)
    }

    handleClose()
    

  }

  

  return (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Stack sx={style} spacing={2}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {ticket.movie["Title"]}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {ticket.date}
      </Typography>
      <br/>
      {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {ticket.price}
      </Typography>
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="component-simple">Number of people</InputLabel>
        <Input id="component-simple" type='number' defaultValue={1}/>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seat</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenSeat}
          label="Seat"
          onChange={(event) => {
            // setChosenSeats(seats => [...seats, event.target.value]);
            setChosenSeat(event.target.value)
          }}
          // multiple
        >
          {seatAvailable.map(seat => {
            return <MenuItem value={seat}>{seat}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Snacks</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenSnack}
          label="Snacks"
          onChange={(event) => {
            // setChosenSnacks(snack => [...snack, event.target.value]);
            setChosenSnack(event.target.value)
          }}
          // multiple
        >
          {snacks.map(snack => {
            if (!snack) return null
            return <MenuItem key={snack.id} value={snack.id}>{snack.name}</MenuItem>
          })}
        </Select>
      </FormControl>

      {!loading && <Button variant='contained' onClick={bookingBtnClick}>Make a booking</Button>}
      {loading && <LinearProgress />}
    </Stack>
  </Modal>)
}