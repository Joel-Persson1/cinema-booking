const API_URL = "http://localhost:3000/";

export async function getMovies() {}

export async function getMovieById(id) {
  const response = await fetch(`${API_URL}api/movies/${id}`);
  return await response.json();
}

export async function getScheduleById(id) {
  const response = await fetch(`${API_URL}api/schedule/${id}`);
  return await response.json();
}
