const { getDataFromBlob, uploadDataToBlob, client } = require('./blob')

async function getAllMovies() {
  const data = await getDataFromBlob(client.movies)
  return data
}

async function getMovie(id) {
  let moviesData = await getAllMovies()

  let movie = moviesData.filter((movie) => movie["ID"] === id)
  // console.log('Get movie: ' + movie);

  return movie
}

async function getSnacks() {
  const data = await getDataFromBlob(client.snacks)
  return data
}

async function getTickets() {
  let ticketsData = await getDataFromBlob(client.ticket)
  let moviesData = await getAllMovies()
  let theatresData = await getTheatres()

  ticketsData.map(async (data) => {
    const movie = moviesData.filter((movie) => movie["ID"] === data["movie_id"])[0]
    if (movie) data["movie"] = movie

    const theatre = theatresData.filter((theatre) => theatre["id"] === data["theatre_id"])[0]
    if (theatre) data["theatre"] = theatre
  })

  ticketsData = ticketsData.filter((data) => data.id && data.id.trim().length !== 0)

  return ticketsData
}

async function getTheatres() {
  return await getDataFromBlob(client.theatre)
}

// BOOKING

async function getBookings() {
  return await getDataFromBlob(client.booking)
}

async function addBooking(booking, snacks) {
  const uploadedData = {
    id: booking.id,
    seat: booking.seat,
    status: booking.status,
    customer_id: booking.customer_id,
    ticket_id: booking.ticket_id
  }
  let bookingRetrievedData = await getDataFromBlob(client.booking)

  // Upload snack booking

  // Upload booking
}

// CUSTOMER
async function getCustomers() {
  return await getDataFromBlob(client.customer)
}


module.exports = { 
  getMovies: getAllMovies, getMovie,
  getSnacks, addBooking, getTickets,
  getBookings
}