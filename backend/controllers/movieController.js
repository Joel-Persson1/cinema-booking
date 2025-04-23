import db from "../utilities/database.js";
import {
  getMoviesFromDB,
  getMovieByIdFromDB,
  insertMovieToDB,
  getScheduleByIdFromDB,
  getScreeningWithMovieFromDB,
  createBookingToDB,
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
  const result = insertMovieToDB();
};

export const postBooking = async (req, res) => {
  const {
    booking_reference,
    user_id,
    screening_id,
    total_price,
    num_tickets,
    selectedSeats: booked_seats,
  } = req.body;

  console.log(req.body);

  if (!Array.isArray(booked_seats) || booked_seats.length !== num_tickets) {
    return res
      .status(400)
      .json({ error: "Mismatch between num_tickets and booked_seats" });
  }

  try {
    // Förbered frågan för att kontrollera om några av sätena redan är bokade
    const placeholders = booked_seats.map(() => "?").join(",");
    const checkSql = `
      SELECT seat_number FROM booked_seats
      JOIN bookings ON booked_seats.booking_id = bookings.booking_id
      WHERE bookings.screening_id = ? AND seat_number IN (${placeholders})
    `;

    // Kör SQL-frågan med better-sqlite3
    const stmt = db.prepare(checkSql);
    const alreadyBooked = stmt.all([screening_id, ...booked_seats]);

    if (alreadyBooked.length > 0) {
      return res.status(409).json({
        error: "Some seats are already booked",
        seats: alreadyBooked,
      });
    }

    // Om inga säten är bokade, fortsätt med att skapa bokningen
    const result = await createBookingToDB({
      booking_reference,
      user_id,
      screening_id,
      total_price,
      num_tickets,
      booked_seats,
    });

    res
      .status(201)
      .json({ message: "Booking successful", booking_id: result.booking_id });
  } catch (error) {
    console.error("Error in postBooking", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
