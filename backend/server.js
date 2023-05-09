var express = require('express')
// var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors')

const { getMovies, getMovie, createBooking, getSnacks, getTickets, getBookings } = require('./model')
const port = 5001

let app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false}))



app.get('/', (req, res) => {
  console.log('body');
  res.send({
    "success": "Success"
  })
})

app.get('/movies', async (req, res) => {
  const movies = await getMovies()
  res.send({
    results: movies
  })
})

app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id
  const movie = await getMovie(movieId)
  res.send({
    results: movie
  })
})

app.get('/tickets', async (req, res) => {
  const ticketsData = await getTickets()

  res.send({
    results: ticketsData
  })
})

app.get('/snacks', async (req, res) => {
  let snacks = await getSnacks()
  
  res.send({
    results: snacks
  })
})

app.post('/book', async (req, res) => {
  let body = req.body
  console.log('Make a booking');
  console.log(body);

  if (!body.seat) {
    res.status(403).send({
      error: 'No seat entered'
    })
    return
  }

  if (!body.user.id || !body.ticket_id || !body.snack_id) {
    res.status(403).send({
      error: 'Bad Request'
    })
    return
  }

  await createBooking({
    seat: body.seat,
    status: body.status ?? 'incoming',
    customer_id: body.user.id,
    ticket_id: body.ticket_id,
    snack_id: body.snack_id
  })

  res.status(201).send({
    status: 'success'
  })
})

app.get('/bookings/all', async (req, res) => {
  const bookingsData = await getBookings()

  res.send({
    results: bookingsData
  })
})

app.get('/bookings', async (req, res) => {
  let body = req.body
  if (!body.user.id) {
    res.status(403).send({
      error: 'Bad Request'
    })
    return
  }

  let bookingsData = await getBookings()
  bookingsData = bookingsData.filter((data) => data["customer_id"] === body.user.id)
  res.send({
    results: bookingsData
  })
})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})