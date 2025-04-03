import db from "../utilities/database";

// Models filerna hanterar databas querys. Applicera här returnera resultaten utan error hantering.

export const getMoviesFromDB = () => {};

export const getMovieByIdFromDB = (id) => {
  const stmt = db.prepare("SELECT * FROM movies WHERE movie_id  = ?");
  return stmt.all(id);
};

export const insertMovieToDB = () => {};
