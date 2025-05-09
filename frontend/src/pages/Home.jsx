import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovies } from "../services/MovieApi";
import "../styles/MovieGrid.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import MovieCard from "../components/movieCard";

function Home() {
  const [user, setUser] = useState(null);
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // const [welcomeMessage, setWelcomeMessage] = useState(null);

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
      toast.success(location.state.message);
    }
  }, [location.state]);

  return (
    <main>
      <div className="banner-container">
        {/* Stor bild till vänster */}
        <div className="banner-main">
          <img
            src="https://www.nfbio.se/media/2023/07/mission-impossible-7-1.jpg" // Exempelbild, byt till din om du vill
            alt="Mission Impossible Banner"
            className="banner-main-img"
          />
          <span className="banner-tickets-text">TICKETS</span>
          <div className="banner-main-content">
            <img src="/images/tron-ares.jpg" alt="Tron Ares" />
            <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: 8}}>Kommer ut snart- Tron Ares</h2>
            <p style={{marginBottom: 16}}>Upplev i 4DX | Förhandsvisning!</p>
          </div>
        </div>
        {/* Två mindre rutor till höger */}
        <div className="banner-side">
          <div className="banner-side-box">
            <img src="/images/avatar-fire-ash.jpg" alt="Avatar Fire & Ash" className="banner-side-img" />
            <div className="banner-side-content">
              <div className="banner-side-title">Avatar Fire & Ash</div>
              <div className="banner-side-desc">Den är tillbaka</div>
            </div>
          </div>
          <div className="banner-side-box">
            <img src="/images/avengers.jpg" alt="The Avengers" className="banner-side-img" />
            <div className="banner-side-content">
              <div className="banner-side-title">The Avengers</div>
              <div className="banner-side-desc">Kommer snart!</div>
            </div>
          </div>
        </div>
      </div>
      {user?.role === "admin" ? (
        <>
          <button
            onClick={() => navigate("/newMovie")}
            className="add-movie-button"
          >
            Add new movie
          </button>
          <button
            onClick={() => navigate("/newScreening")}
            className="add-movie-button"
          >
            Add Screening
          </button>
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
