import { Link } from "react-router-dom";

export function Movie({ data }) {
  return (
    <div className="movie">
      <Link to={`/movie/${data.movie_id}`}>{data.title}</Link>
    </div>
  );
}
