var express = require('express')
// var router = express.Router();
var bodyParser = require('body-parser');

const { getMovies, addBooking, getSnacks } = require('./model')
const port = 5001

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false}))



app.get('/', (req, res) => {
  console.log('body');
  res.send({
    "success": "Success"
  })
})

app.get('/movies', (req, res) => {
  let movies = []

  
  res.send(movies)
})

app.get('/snacks', (req, res) => {
  let snacks = []
  
  res.send(snacks)
})

app.post('/movie/book', (req, res) => {
  let body = req.body
  console.log(object);
})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})