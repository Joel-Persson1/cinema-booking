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

export const insertMovieToDB = () => {
  const movies = [
    {
      title: "The Matrix",
      year: 1999,
      runtime: "136 min",
      genre: "Sci-Fi, Action",
      director: "Lana Wachowski, Lilly Wachowski",
      plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      poster_url: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      trailer_url: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
      age_limit: "15",
      imdb_id: "tt0133093"
    },
    {
      title: "Inception",
      year: 2010,
      runtime: "148 min",
      genre: "Sci-Fi, Action",
      director: "Christopher Nolan",
      plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      trailer_url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      age_limit: "12",
      imdb_id: "tt1375666"
    },
    {
      title: "The Dark Knight",
      year: 2008,
      runtime: "152 min",
      genre: "Action, Crime, Drama",
      director: "Christopher Nolan",
      plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      trailer_url: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      age_limit: "15",
      imdb_id: "tt0468569"
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      runtime: "154 min",
      genre: "Crime, Drama",
      director: "Quentin Tarantino",
      plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster_url: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      trailer_url: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      age_limit: "18",
      imdb_id: "tt0110912"
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      runtime: "142 min",
      genre: "Drama",
      director: "Frank Darabont",
      plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      poster_url: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      trailer_url: "https://www.youtube.com/watch?v=6hB3S9bIaco",
      age_limit: "15",
      imdb_id: "tt0111161"
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO movies (
      title, year, runtime, genre, director, plot, 
      poster_url, trailer_url, age_limit, imdb_id
    ) VALUES (
      @title, @year, @runtime, @genre, @director, @plot,
      @poster_url, @trailer_url, @age_limit, @imdb_id
    )
  `);

  movies.forEach(movie => {
    stmt.run(movie);
  });

  return { success: true, message: "Movies added successfully" };
};
