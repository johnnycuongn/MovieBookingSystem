import { Card, Grid, CardContent, Typography } from '@mui/material'
import {useEffect ,useState} from 'react'
import { getBookings } from '../services'

export default function ManageBookingPage() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const bookingsData = await getBookings()

    console.log(bookingsData);

    setBookings(bookingsData ?? [])
  }


  return <Grid container spacing={{ xs: 2, md: 3 }} p={2}>
  {bookings.map((booking, index) => (
    <Grid item xs={2} sm={6} md={6} key={index}>
      <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {booking.ticket.movie["Title"]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {booking.ticket.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {booking.seat}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Theatre: {booking.ticket.theatre.theatre_number}
        </Typography>
      </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
}

function BookingCard() {

}