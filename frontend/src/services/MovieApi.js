// const API_URL = ''

export async function getMovies() {}

export async function getMovieById(id) {
  const response = await fetch(`/api/movies/${id}`);
  return await response.json();
}

export async function getScheduleById(id) {
  const response = await fetch(`/api/schedule/${id}`);
}
