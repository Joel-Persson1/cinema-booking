import db from "../utilities/database.js";

// Models filerna hanterar databas querys. Applicera här returnera resultaten utan error hantering.

export const getMoviesFromDB = () => {
  const stmt = db.prepare(`SELECT * FROM movies`);
  return stmt.all();
};

export const getupcommingBookingsFromDB = (userId) => {
  const stmt = db.prepare(`
  SELECT 
  bookings.booking_id,
  bookings.booking_reference,
  bookings.booking_time,
  bookings.total_price,
  bookings.num_tickets,

  screenings.screening_id,
  screenings.date AS screening_date,
  screenings.start_time AS screening_start_time,
  screenings.ticket_price,

  movies.movie_id,
  movies.title,
  movies.year,
  movies.poster_url,
  movies.runtime,
  movies.genre,

  theaters.theater_id,
  theaters.name AS theater_name,

  GROUP_CONCAT(booked_seats.seat_number) AS seats

FROM bookings
JOIN screenings ON bookings.screening_id = screenings.screening_id
JOIN movies ON screenings.movie_id = movies.movie_id
JOIN theaters ON screenings.theater_id = theaters.theater_id
LEFT JOIN booked_seats ON bookings.booking_id = booked_seats.booking_id

WHERE bookings.user_id = ?
GROUP BY bookings.booking_id
ORDER BY screenings.date ASC, screenings.start_time ASC`);
  return stmt.all(userId);
};

export const getTheatersFromDB = () => {
  const stmt = db.prepare(`SELECT * FROM theaters`);
  return stmt.all();
};

export const getMovieByIdFromDB = (id) => {
  const stmt = db.prepare("SELECT * FROM movies WHERE movie_id=?");
  return stmt.get(id);
};

export const deleteMovieFromDB = (id) => {
  const stmt = db.prepare("DELETE FROM movies WHERE movie_id = ?");
  return stmt.run(id);
};

export const getScheduleByIdFromDB = (id) => {
  const query = `
  SELECT 
  s.screening_id,
  s.date,
  s.start_time,
  s.ticket_price,
  t.name AS theater_name,
  t.total_seats AS theater_capacity,
  (t.total_seats - COUNT(bs.booked_seat_id)) AS available_seats
  FROM screenings s
  JOIN theaters t ON s.theater_id = t.theater_id
  LEFT JOIN bookings b ON s.screening_id = b.screening_id
  LEFT JOIN booked_seats bs ON b.booking_id = bs.booking_id
  WHERE s.movie_id=?
  GROUP BY s.screening_id
  ORDER BY s.start_time ASC`;

  const stmt = db.prepare(query);

  return stmt.all(id);
};

export const getScreeningWithMovieFromDB = (id) => {
  const screeningQuery = `
  SELECT
    s.screening_id,
    s.start_time,
    s.ticket_price,
    s.date,
    t.seats_per_row as seats_per_row,
    t.name AS theater_name,
    t.total_seats AS theater_capacity,
    (t.total_seats - COUNT(bs.booked_seat_id)) AS available_seats,
    m.title,
    m.poster_url,
    m.genre,
    m.runtime,
    m.imdb_id
  FROM screenings s
  JOIN theaters t ON s.theater_id = t.theater_id
  JOIN movies m ON s.movie_id = m.movie_id
  LEFT JOIN bookings b ON s.screening_id = b.screening_id
  LEFT JOIN booked_seats bs ON b.booking_id = bs.booking_id
  WHERE s.screening_id = ?
  GROUP BY 
    s.screening_id, 
    s.start_time, 
    s.ticket_price, 
    t.name, 
    t.total_seats, 
    m.title, 
    m.poster_url, 
    m.genre,
    m.runtime,
    m.imdb_id
`;

  const bookedSeatsQuery = `
    SELECT seat_number 
    FROM booked_seats 
    JOIN bookings ON booked_seats.booking_id = bookings.booking_id 
    WHERE bookings.screening_id = ?
  `;

  const screening = db.prepare(screeningQuery).get(id);

  const parsedSeatsPerRow = JSON.parse(screening.seats_per_row);

  const bookedSeats = db
    .prepare(bookedSeatsQuery)
    .all(id)
    .map((row) => row.seat_number);

  return { ...screening, seats_per_row: parsedSeatsPerRow, bookedSeats };
};

export const getBookingFromDB = (bookingReference) => {
  const bookingStmt = db.prepare(`
    SELECT 
      b.*, 
      u.name AS user_name, 
      s.start_time,
      s.ticket_price,
      m.title AS movie_title, 
      m.poster_url,
      t.name AS theater_name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN screenings s ON b.screening_id = s.screening_id
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE b.booking_reference = ?
  `);

  const booking = bookingStmt.get(bookingReference);

  if (!booking) return booking;

  const seatsStmt = db.prepare(`
    SELECT seat_number 
    FROM booked_seats 
    WHERE booking_id = ? 
    ORDER BY seat_number
  `);

  const bookedSeats = seatsStmt
    .all(booking.booking_id)
    .map((row) => row.seat_number);

  return {
    ...booking,
    booked_seats: bookedSeats,
  };
};

export const createBookingToDB = ({
  booking_reference,
  user_id,
  screening_id,
  total_price,
  num_tickets,
  booked_seats,
}) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Startar insättning i bookings-tabellen");

      // Infogar bokning
      const insertBookingStmt = db.prepare(
        `INSERT INTO bookings (
          booking_reference, user_id, screening_id, total_price, num_tickets
        ) VALUES (?, ?, ?, ?, ?)`
      );

      const result = insertBookingStmt.run(
        booking_reference,
        user_id,
        screening_id,
        total_price,
        num_tickets
      );

      // Logga om insert lyckades
      console.log("Resultat av insert i bookings:", result);

      // Hämta booking_id direkt från result
      const booking_id = result.lastInsertRowid;

      if (!booking_id) {
        return reject(new Error("Failed to retrieve booking_id"));
      }

      console.log("Hämtade booking_id:", booking_id);

      // Förbereder och kör infogningen av varje säte
      const stmt = db.prepare(
        `INSERT INTO booked_seats (booking_id, seat_number) VALUES (?, ?)`
      );

      // Kör frågan för varje bokat säte
      for (const seat of booked_seats) {
        stmt.run(booking_id, seat);
      }

      resolve({ booking_id });
    } catch (err) {
      console.error("Error in createBookingToDB:", err);
      reject(err);
    }
  });
};

export const insertScreeningToDB = (screeningData) => {
  const stmt = db.prepare(`
    INSERT INTO screenings (
    movie_id,
    theater_id,
    start_time,
    date
    ) VALUES (?, ?, ?, ?)
    `);

  return stmt.run(
    screeningData.movie_id,
    screeningData.theater_id,
    screeningData.start_time,
    screeningData.date
  );
};

export const insertMovieToDB = (movieData) => {
  const stmt = db.prepare(`
    INSERT INTO movies (
      imdb_id,
      title,
      year,
      runtime,
      genre,
      director,
      plot,
      poster_url,
      trailer_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    movieData.imdbID,
    movieData.Title,
    movieData.Year,
    movieData.Runtime,
    movieData.Genre,
    movieData.Director,
    movieData.Plot,
    movieData.Poster,
    movieData.trailer_url
  );
};

export const checkIfMovieExists = async (id) => {
  const stmt = db.prepare("SELECT * FROM movies WHERE imdb_id = ?");
  try {
    const result = await stmt.get(id);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};
