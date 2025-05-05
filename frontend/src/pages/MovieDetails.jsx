// import ReactPlayer from "react-player";
// import { useLoaderData } from "react-router-dom";
// import { getMovieById, getScheduleById } from "../services/MovieApi";
// import ScheduleById from "../components/ScheduleById";
// import "../styles/MovieDetails.css";

// export default function MovieDetails() {
//   const { movie, schedule } = useLoaderData();

//   console.log(schedule);

//   if (movie.error) return <p>Movie not found</p>;

//   return (
//     <div className="movie-details-container">
//       <div className="movie-content">
//         <div className="trailer-container">
//           <ReactPlayer url={movie.trailer_url} width="100%" controls={true} />
//         </div>

//         <div className="poster-container">
//           <img src={movie.poster_url} alt={`${movie.title} poster`} />
//         </div>
//       </div>

//       <div className="movie-info-container">
//         <h1 className="movie-title">{movie.title}</h1>

//         <div className="movie-meta">
//           <p>{movie.year}</p>
//           <p>{movie.runtime}</p>
//           <p>{movie.genre}</p>
//           <p>{movie.director}</p>
//         </div>

//         <p className="movie-plot">{movie.plot}</p>
//       </div>

//       <ScheduleById schedule={schedule} />
//     </div>
//   );
// }

// export async function loader({ params }) {
//   const movie = await getMovieById(params.movieId);
//   const schedule = await getScheduleById(params.movieId);

//   const uniqueDates = [...new Set(schedule.map((s) => s.date))];

//   console.log(uniqueDates);

//   return { movie, schedule };
// }

import React, { useState, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";
import { useLoaderData } from "react-router-dom";
import { getMovieById, getScheduleById } from "../services/MovieApi";
import ScheduleById from "../components/ScheduleById";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { movie, schedule } = useLoaderData();
  const [selectedDate, setSelectedDate] = useState(null);
  const now = new Date(); // Den aktuella tiden

  // Extrahera unika datum från schemat
  const uniqueDates = useMemo(() => {
    return [...new Set(schedule.map((s) => s.date))]
      .filter((date) => new Date(`${date}T23:59:59`) >= now) // Endast framtida datum
      .sort((a, b) => new Date(a) - new Date(b));
  }, [schedule]);

  // Filtrera visningarna baserat på valt datum och om de är framtida
  const filteredSchedule = schedule.filter((s) => {
    const screeningDateTimeStr = `${s.date}T${s.start_time.replace(
      ".",
      ":"
    )}:00`;
    const screeningDateTime = new Date(screeningDateTimeStr);

    // Exkludera visningar som redan har passerat
    return screeningDateTime >= now && s.date === selectedDate;
  });

  // Auto-välj första datumet om inget är valt
  useEffect(() => {
    if (uniqueDates.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDates[0]); // Sätt första datumet som valt
    }
  }, [uniqueDates, selectedDate]);

  if (movie.error) return <p>Movie not found</p>;

  return (
    <div className="movie-details-container">
      <div className="movie-content">
        <div className="trailer-container">
          <ReactPlayer url={movie.trailer_url} width="100%" controls={true} />
        </div>

        <div className="poster-container">
          <img src={movie.poster_url} alt={`${movie.title} poster`} />
        </div>
      </div>

      <div className="movie-info-container">
        <h1 className="movie-title">{movie.title}</h1>

        <div className="movie-meta">
          <p>{movie.year}</p>
          <p>{movie.runtime}</p>
          <p>{movie.genre}</p>
          <p>{movie.director}</p>
        </div>

        <p className="movie-plot">{movie.plot}</p>
      </div>

      <div className="schedule-container">
        <h2>Available Screenings</h2>
        <div className="date-buttons">
          {uniqueDates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={selectedDate === date ? "selected-date" : ""}
            >
              {new Date(date).toLocaleDateString("sv-SE", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              })}
            </button>
          ))}
        </div>

        {/* Visar de filtrerade visningarna */}
        <ScheduleById schedule={filteredSchedule} />
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const movie = await getMovieById(params.movieId);
  const schedule = await getScheduleById(params.movieId);

  return { movie, schedule };
}
