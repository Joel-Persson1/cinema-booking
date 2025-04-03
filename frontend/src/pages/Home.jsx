import { getMovies } from "../services/MovieApi";

function Home() {
  return <div>Home</div>;
}

export async function loader() {
  const movies = getMovies();
  return movies;
}

export default Home;
