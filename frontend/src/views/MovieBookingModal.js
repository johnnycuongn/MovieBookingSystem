import {useState} from 'react'
import {
   Typography, Box, Modal, FormControl, Input, InputLabel, Select, MenuItem, Button, Stack
} from '@mui/material';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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
  'A1',
  'A2',
  'A3',
  'A4',
  'B1',
  'B2',
  'B3',
  'B4',
]

const snacks = [
  'snack1',
  'snack2',
  'snack3',
  'snack4',
]

export default function MovieBookingModal({movie, open, handleClose}) {

  const [date, setDate] = useState(new Date());

  const [chosenSeats, setChosenSeats] = useState([])
  const [chosenSnacks, setChosenSnacks] = useState([])

  function bookingBtnClick() {

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
        {movie.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {movie.desc}
      </Typography>
      <br/>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="component-simple">Number of people</InputLabel>
        <Input id="component-simple" type='number' defaultValue={1}/>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seat</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenSeats}
          label="Seat"
          onChange={(event) => {
            setChosenSeats(seats => [...seats, event.target.value]);
          }}
          multiple
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
          value={chosenSnacks}
          label="Seat"
          onChange={(event) => {
            setChosenSnacks(snack => [...snack, event.target.value]);
          }}
          multiple
        >
          {snacks.map(snack => {
            return <MenuItem value={snack}>{snack}</MenuItem>
          })}
        </Select>
      </FormControl>

      <Button variant='contained' onClick={bookingBtnClick}>Make a booking</Button>
    </Stack>
  </Modal>)
}