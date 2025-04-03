import {
  getMoviesFromDB,
  getMoviesByIdFromDB,
  insertMovieToDB,
  getScheduleByIdFromDB,
} from "../models/movieModel.js";

// Detta är våra funktioner för våra endpoints. Fyll i med request och returnera ett response
// Detta är bara en layout ingenting fungerar ännu

export const getMovies = (req, res, next) => {
  const movies = getMoviesFromDB();
};

export const getMovieById = (req, res, next) => {
  const movieWithId = getMoviesByIdFromDB();
};

export const getMovieScheduleById = (req, res, next) => {
  const { id } = req.params;

  const scheduleWithId = getScheduleByIdFromDB(id);

  if (!scheduleWithId) {
    return res.status(404).json({ error: "Schedule not found" });
  }

  res.status(200).json(scheduleWithId);
};

export const postMovie = (req, res, next) => {
  const result = insertMovieToDB();
};
