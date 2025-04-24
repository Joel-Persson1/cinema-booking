import {
  getMoviesFromDB,
  getMovieByIdFromDB,
  insertMovieToDB,
  getScheduleByIdFromDB,
  getScreeningWithMovieFromDB,
} from "../models/movieModel.js";

// Detta är våra funktioner för våra endpoints. Fyll i med request och returnera ett response
// Detta är bara en layout ingenting fungerar ännu

export const getMovies = (req, res, next) => {
  const movies = getMoviesFromDB();

  res.status(200).json(movies);
};

export const getMovieById = (req, res, next) => {
  try {
    const { id } = req.params;
    const response = getMovieByIdFromDB(id);

    if (!response) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieScheduleById = (req, res, next) => {
  const { id } = req.params;

  const scheduleWithId = getScheduleByIdFromDB(id);

  if (!scheduleWithId) {
    return res.status(404).json({ error: "Schedule not found" });
  }

  res.status(200).json(scheduleWithId);
};

export const getScreeningWithMovie_ = (req, res, next) => {
  const { id } = req.params;

  const screeningWithMovie = getScreeningWithMovieFromDB(id);

  if (!screeningWithMovie)
    return res.status(404).json({ error: "screening not found" });

  res.status(200).json(screeningWithMovie);
};

export const postMovie = (req, res, next) => {
  try {
    const result = insertMovieToDB();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add movies" });
  }
};
