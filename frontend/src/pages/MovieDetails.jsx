import ReactPlayer from "react-player";
import { useLoaderData } from "react-router-dom";
import { getMovieById, getScheduleById } from "../services/MovieApi";
import ScheduleById from "../components/ScheduleById";

export default function MovieDetails() {
  const { movie, schedule } = useLoaderData();
  console.log(movie);

  if (movie.error) return <p>Movie not found</p>;

  return (
    <div>
      <ReactPlayer url={movie.trailer_url} />

      <div className="movie-details">
        <h1>{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.runtime}</p>
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
        <p>{movie.plot}</p>
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
