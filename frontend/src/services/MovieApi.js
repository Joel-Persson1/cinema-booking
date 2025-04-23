const API_URL = "http://localhost:3000/";

export async function getMovies() {
  const response = await fetch(`${API_URL}api/movies`);
  return await response.json();
}

export async function getMovieById(id) {
  const response = await fetch(`${API_URL}api/movies/${id}`);
  return await response.json();
}

export async function getScheduleById(id) {
  const response = await fetch(`${API_URL}api/schedule/${id}`);
  return await response.json();
}

export async function getScreeningWithMovie(id) {
  const response = await fetch(`${API_URL}api/booking/${id}`);

  return await response.json();
}

export async function checkIfLoggedIn() {
  const response = await fetch(`${API_URL}auth/whoami`, {
    method: "GET",
    credentials: "include",
  });

  return await response.json();
}

export async function insertBooking(bookingData) {
  const response = await fetch(`${API_URL}api/booking/post`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(bookingData),
  });
  return await response.json();
}
