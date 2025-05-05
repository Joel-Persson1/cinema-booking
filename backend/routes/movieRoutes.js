import express from "express";

import {
  getMovies,
  getMovieById,
  postMovie,
  getMovieScheduleById,
  getScreeningWithMovie_,
  postBooking,
  deleteMovieById,
  getBooking,
  getTheaters,
  postScreening,
  getUpcommingBookings_,
} from "../controllers/movieController.js";

const router = express.Router();

// Här är en layout för våra routes i backend, fyll i med en funktion i dessa endpoints

router.get("/api/movies", getMovies);

router.get("/api/upcommingBookings/:id", getUpcommingBookings_);

router.get("/api/theaters", getTheaters);

router.get("/api/movies/:id", getMovieById);

router.get("/api/schedule/:id", getMovieScheduleById);

router.get("/api/booking/:id", getScreeningWithMovie_);

router.post("/api/insert/screenings", postScreening);

router.post("/api/movies/post", postMovie);

router.post("/api/booking/post", postBooking);

router.get("/api/bookings/:bookingReference", getBooking);

router.post("/api/movie/post", postMovie);

router.delete("/api/movie/delete/:id", deleteMovieById);

export default router;
