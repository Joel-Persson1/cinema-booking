import express from "express";

import {
  getMovies,
  getMovieById,
  postMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// Här är en layout för våra routes i backend, fyll i med en funktion i dessa endpoints

router.get("/api/movies", getMovies);

router.get("/api/movies/:id", getMovieById);

router.post("/api/movies/post", postMovie);

export default router;
