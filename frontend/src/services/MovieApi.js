const API_URL = "http://localhost:3000/";

const Dummy = [
  {
    movie_id: 1,
    imdb_id: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    runtime: "152 min",
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    plot: 'Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos. Batman\'s struggle against The Joker becomes deeply personal, forcing him to "confront everything he believes" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.',
    poster_url:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    is_active: 1,
  },
  {
    movie_id: 2,
    imdb_id: "tt0816692",
    title: "Interstellar",
    year: 2014,
    runtime: "169 min",
    genre: "Adventure, Drama, Sci-Fi",
    director: "Christopher Nolan",
    plot: "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
    poster_url:
      "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
    is_active: 1,
  },
];

export async function getMovies() {}

export async function getMovieById(id) {
  const response = await fetch(`${API_URL}api/movies/${id}`);
  return await response.json();

  // const response = Dummy.find((item) => item.movie_id == id);
  // return response;
}

export async function getScheduleById(id) {
  const response = await fetch(`${API_URL}api/schedule/${id}`);
  return await response.json();
}
