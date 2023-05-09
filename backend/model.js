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
  const ticketsData = await getTickets()
  // const customersData = await getCustomers()
  let bookingsData = await getDataFromBlob(client.booking)
  const bookingsids = bookingsData.map((data) => data.id)

  let snackBookingsData = await getDataFromBlob(client.snackBooking)
  const snacksData = await getSnacks()

  snackBookingsData = snackBookingsData.filter((data) => bookingsids.includes(data.booking_id))
  snackBookingsData.map((data) => {
    const snack = snacksData.filter((snackData) => snackData.id === data.snack_id)[0]
    if (snack) data["snack"] = snack
  })

  bookingsData.map((bookingData) => {
    const ticket = ticketsData.filter((ticket) => ticket.id === bookingData["ticket_id"])[0]
    if (ticket) bookingData["ticket"] = ticket

    let snackBookings = snackBookingsData.filter((snackBooking) => snackBooking.booking_id === bookingData.id)
    if (snackBookings && snackBookings.length > 0) bookingData["snacks"] = snackBookings[snackBookings.length-1]
  })

  return bookingsData
}

async function createBooking(booking = {
  seat: '',
  status: '',
  customer_id: '',
  ticket_id: '',
  snack_id: '',
}) {

  let bookingsData = await getDataFromBlob(client.booking)
  let snackBookingsData = await getDataFromBlob(client.snackBooking)
  const bookingId = bookingsData.length + 1
  const bookingUploadedData = {
    id: bookingId,
    seat: booking.seat,
    status: booking.status,
    customer_id: booking.customer_id,
    ticket_id: booking.ticket_id
  }

  const snackBookingUploadedData = {
    id: snackBookingsData.length+1,
    quantity: 2,
    snack_id: booking.snack_id,
    booking_id: bookingId
  }

  bookingsData.push(bookingUploadedData)
  // Upload snack booking
  
  snackBookingsData.push(snackBookingUploadedData)

  // Upload booking
  await uploadDataToBlob(client.booking, bookingsData)
  await uploadDataToBlob(client.snackBooking, snackBookingsData) 
}

// CUSTOMER
async function getCustomers() {
  return await getDataFromBlob(client.customer)
}


module.exports = { 
  getMovies: getAllMovies, getMovie,
  getSnacks, createBooking, getTickets,
  getBookings
}