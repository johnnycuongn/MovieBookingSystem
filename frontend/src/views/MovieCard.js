import {useState} from 'react'
import {
  Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Modal
} from '@mui/material';

import MovieBookingModal from './MovieBookingModal';

export default function MovieCard({movie}) {

  const [open, setOpen] = useState(false)


  return (<><Card sx={{ width: 0.8, height: 1 }}>
      {/* <CardMedia
        component="img"
        image={movie.img}
        alt={movie.title}
      /> */}
      <CardContent>
        <Typography variant="h5">
          {movie.title}
        </Typography>
        {movie.desc}
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
    <MovieBookingModal movie={movie} open={open} handleClose={() => {
      setOpen(false)
    }}/>
    </>)
}