import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovies } from "../services/MovieApi";
import "../styles/MovieGrid.css";
import { useEffect, useState } from "react";

import MovieCard from "../components/movieCard";

function Home() {
  const [user, setUser] = useState(null);
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  const [welcomeMessage, setWelcomeMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("http://localhost:3000/auth/whoami", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        console.log(data.user);
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, [location]);

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
    <main>
      {welcomeMessage && <div>{welcomeMessage}</div>}

      {user?.role === "admin" ? (
        <>
          <button onClick={() => navigate("/newMovie")} className="add-movie-button">Add new movie</button>
          <section className="movie-grid">
            {data.map((movie) => (
              <MovieCard movie={movie} key={movie.movie_id} />
            ))}
          </section>
        </>
      ) : (
        <section className="movie-grid">
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
        </section>
      )}

      {/* {} */}
    </main>
  );
}

export async function loader() {
  const movies = getMovies();
  return movies;
}

export default Home;
