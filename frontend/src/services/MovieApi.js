const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const API_URL = "http://localhost:3000/";

export async function getMovies() {
  const response = await fetch(`${API_URL}api/movies`);
  return await response.json();
}

export async function getUpcommingBookings(userId) {
  const response = await fetch(`${API_URL}api/upcommingBookings/${userId}`);
  return await response.json();
}

export async function getTheaters() {
  const response = await fetch(`${API_URL}api/theaters`);
  return await response.json();
}

export async function insertScreening(data) {
  const response = await fetch(`${API_URL}api/insert/screenings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getBookingReference(bookingReference) {
  const res = await fetch(`${API_URL}api/bookings/${bookingReference}`);

  console.log(res);

  if (!res.ok) throw Error(`Couldn't find order #${bookingReference}`);

  const booking = await res.json();
  return booking;
}

export async function getMovieById(id) {
  const response = await fetch(`${API_URL}api/movies/${id}`);
  return await response.json();
}

export async function deleteMovie(id) {
  try {
    const response = await fetch(`${API_URL}api/movie/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    return "The movie was deleted";
  } catch (error) {
    console.log(error);
    return null;
  }
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

export const fetchMovieByTitle = async (title) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
  );
  const data = await response.json();

  return data;
};

export async function insertMovie(movieData) {
  try {
    const data = await fetch(`${API_URL}api/movie/post`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    const response = await data.json();

    if (response?.error) throw new Error(response.error);

    return response;
  } catch (error) {
    console.log(error);
  }
}
