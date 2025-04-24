import ReactPlayer from "react-player";
import { useLoaderData } from "react-router-dom";
import { getMovieById, getScheduleById } from "../services/MovieApi";
import ScheduleById from "../components/ScheduleById";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { movie, schedule } = useLoaderData();

  if (movie.error) return <p>Movie not found</p>;

  return (
    <div className="movie-details-container">
      <div className="movie-content">
        <div className="trailer-container">
          <ReactPlayer 
            url={movie.trailer_url} 
            width="100%"
            controls={true}
          />
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

      <ScheduleById schedule={schedule} />
    </div>
  );
}

export async function loader({ params }) {
  const movie = await getMovieById(params.movieId);
  const schedule = await getScheduleById(params.movieId);
  return { movie, schedule };
}
