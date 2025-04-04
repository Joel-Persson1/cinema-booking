import { Link, useLoaderData } from "react-router-dom";
import { getMovies } from "../services/MovieApi";

function Home() {
  const data = useLoaderData();

  console.log(data);

  return (
    <main>
      {data.map((movie) => (
        <Link to={`movie/${movie.movie_id}`}>
          <img src={movie.poster_url} alt="" />
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
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
