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