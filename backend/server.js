var express = require('express')
// var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors')

const { getMovies, getMovie, addBooking, getSnacks, getTickets } = require('./model')
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

app.get('/snacks', (req, res) => {
  let snacks = []
  
  res.send({
    results: snacks
  })
})

app.post('/movie/book', (req, res) => {
  let body = req.body
  console.log('Make a booking');
  console.log(object);
})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})