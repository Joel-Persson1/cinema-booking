import db from "../utilities/database.js";

// Models filerna hanterar databas querys. Applicera här returnera resultaten utan error hantering.

export const getMoviesFromDB = () => {
  const stmt = db.prepare(`SELECT * FROM movies`);
  return stmt.all();
};

export const getMovieByIdFromDB = (id) => {
  const stmt = db.prepare("SELECT * FROM movies WHERE movie_id=?");
  return stmt.get(id);
};

export const getScheduleByIdFromDB = (id) => {
  const query = `
  SELECT 
  s.screening_id,
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
  const query = `
  SELECT
    s.screening_id,
    s.start_time,
    s.ticket_price,
    s.date,
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

  const stmt = db.prepare(query);

  return stmt.get(id);
};

export const insertMovieToDB = () => {};
