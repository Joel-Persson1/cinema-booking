import {
  getMoviesFromDB,
  getMoviesByIdFromDB,
  insertMovieToDB,
} from "../models/movieModel.js";

// Detta är våra funktioner för våra endpoints. Fyll i med request och returnera ett response
// Detta är bara en layout ingenting fungerar ännu

export const getMovies = (req, res, next) => {
  const movies = getMoviesFromDB();
};

export const getMovieById = (req, res, next) => {
  const movieWithId = getMoviesByIdFromDB();
};

export const postMovie = (req, res, next) => {
  const result = insertMovieToDB();
};
