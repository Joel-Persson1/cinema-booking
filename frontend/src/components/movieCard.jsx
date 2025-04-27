import { Link, useNavigate } from "react-router-dom";
import { deleteMovie } from "../services/MovieApi";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  async function handleDeleteMovie() {
    const message = await deleteMovie(movie.movie_id);
    console.log(message);

    navigate(0);
  }

  return (
    <div>
      <Link
        to={`movie/${movie.movie_id}`}
        className="movie-card"
        key={movie.movie_id}
      >
        <div className="movie-poster">
          <img src={movie.poster_url} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p className="genre">{movie.genre}</p>
        </div>
      </Link>
      <button onClick={handleDeleteMovie} className="delete-button">Delete movie</button>
    </div>
  );
}

export default MovieCard;
