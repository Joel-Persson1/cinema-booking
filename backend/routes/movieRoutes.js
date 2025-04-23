import express from "express";

import {
  getMovies,
  getMovieById,
  postMovie,
  getMovieScheduleById,
  getScreeningWithMovie_,
  postBooking,
} from "../controllers/movieController.js";

const router = express.Router();

// Här är en layout för våra routes i backend, fyll i med en funktion i dessa endpoints

router.get("/api/movies", getMovies);

router.get("/api/movies/:id", getMovieById);

router.get("/api/schedule/:id", getMovieScheduleById);

router.get("/api/booking/:id", getScreeningWithMovie_);

router.post("/api/movies/post", postMovie);

router.post("/api/booking/post", postBooking);

export default router;
