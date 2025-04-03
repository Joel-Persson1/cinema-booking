import { useLoaderData } from "react-router-dom";
import { getMovieDetails } from "../../services/apiRestaurant";

export default function MovieDetails() {
  const movie = useLoaderData();

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p>{movie.year}</p>
      <p>{movie.runtime}</p>
      <p>{movie.genre}</p>
      <p>{movie.director}</p>
      <p>{movie.plot}</p>
    </div>
  );
}

export async function loader({ params }) {
  const movie = await getMovieDetails(params.movieId);
  return movie;
}
