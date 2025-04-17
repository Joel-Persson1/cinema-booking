import { Link, useLoaderData, useLocation } from "react-router-dom";
import { getMovies } from "../services/MovieApi";
import "../styles/MovieGrid.css";
import { useEffect, useState } from "react";

function Home() {
  const data = useLoaderData();
  const location = useLocation();

  const [welcomeMessage, setWelcomeMessage] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setWelcomeMessage(location.state.message);

      const timer = setTimeout(() => {
        setWelcomeMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <main className="movie-grid">
      {welcomeMessage && <div>{welcomeMessage}</div>}

      {data.map((movie) => (
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
      ))}
    </main>
  );
}

export async function loader() {
  const movies = getMovies();
  return movies;
}

export default Home;
