import {
  getMoviesFromDB,
  getMovieByIdFromDB,
  insertMovieToDB,
} from "../models/movieModel";

// Detta är våra funktioner för våra endpoints. Fyll i med request och returnera ett response
// Detta är bara en layout ingenting fungerar ännu

export const getMovies = (req, res, next) => {
  const movies = getMoviesFromDB();
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

export const postMovie = (req, res, next) => {
  const result = insertMovieToDB();
};
