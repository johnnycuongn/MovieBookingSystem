import { postData } from "./helpers"

const BASE_URL = 'http://localhost:5001'

export async function getTickets() {
  const response = await fetch(`${BASE_URL}/tickets`)
  const body = await response.json()

  return body.results
}

export async function getMovies() {
  const response = await fetch(`${BASE_URL}/movies`)
  const body = await response.json()

  return body.results
}

export async function getSnacks() {
  const response = await fetch(`${BASE_URL}/snacks`)
  const body = await response.json()

  return body.results
}

const bookingDataParam = {
  ticket_id: 0,
  seat: '',
  snack_id: ''
}

export async function makeBooking(data = bookingDataParam) {
  let requestData = {
    ticket_id: data.ticket_id,
    status: 'incoming',
    seat: data.seat,
    snack_id: data.snack_id
  }
  const response = postData(`${BASE_URL}/book`, requestData)
}