import { Link, useLoaderData } from "react-router-dom";
import { getMovies } from "../services/MovieApi";
import "../styles/MovieGrid.css";

function Home() {
  const data = useLoaderData();

  return (
    <main className="movie-grid">
      {data.map((movie) => (
        <Link to={`movie/${movie.movie_id}`} className="movie-card" key={movie.movie_id}>
          <div className="movie-poster">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p className="genre">{movie.genre}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}

export async function loader() {
  const movies = getMovies();
  return movies;
}

export default Home;
