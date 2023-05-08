import {useEffect, useState} from 'react'
import {
  Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Modal, Stack
} from '@mui/material';

import TicketBookingModal from './TicketBookingModal';

export default function TicketCard({ticket}) {

  const [open, setOpen] = useState(false)

  if (!ticket) {
    return <></>
  }

  return (<><Card sx={{ width: 0.8, height: 1 }}>
      {/* <CardMedia
        component="img"
        image={movie.img}
        alt={movie.title}
      /> */}
      <CardContent>
        <Stack>
        <Typography variant="h5">
          {ticket.movie["Title"]}
        </Typography>
        <p>{ticket.price}</p>
        <p>{ticket.date}</p>
        </Stack>

        
      </CardContent>
      <CardActions>
        {
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true)
            }}
          >
            Book
          </Button>
      }
      </CardActions>
    </Card>
    <TicketBookingModal ticket={ticket} open={open} handleClose={() => {
      setOpen(false)
    }}/>
    </>)
}