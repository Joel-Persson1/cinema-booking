import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Form } from "react-router-dom";
import { getMovies, getTheaters, insertScreening } from "../services/MovieApi";

function NewScreening() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [screeningTime, setScreeningTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();

      console.log(movies);

      if (!movies) {
        return console.log("No movies was found");
      }

      setMovies(movies);

      const theaters = await getTheaters();

      if (!theaters) {
        return console.log("No theaters was found");
      }

      setTheaters(theaters);
    };
    fetchData();
  }, []);

  console.log(theaters);
  console.log(screeningTime);

  return (
    <Form method={"POST"}>
      <select
        required
        name="movie_id"
        id="movies"
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
      >
        {movies.map((movie) => {
          return (
            <option key={movie.title} value={movie.movie_id}>
              {movie.title}
            </option>
          );
        })}
      </select>

      <select
        required
        name="theater_id"
        id="theaters"
        value={selectedTheater}
        onChange={(e) => setSelectedTheater(e.target.value)}
      >
        {theaters.map((theater) => {
          return (
            <option key={theater.name} value={theater.theater_id}>
              {theater.name} - {theater.total_seats}
            </option>
          );
        })}
      </select>

      <input
        required
        type="datetime-local"
        name="time"
        value={screeningTime}
        onChange={(e) => setScreeningTime(e.target.value)}
      />

      <button type="submit"> Add Screening</button>
    </Form>
  );
}

export async function action({ request }) {
  const movieData = await request.formData();
  let data = Object.fromEntries(movieData);

  const [datePart, timePart] = data.time.split("T");

  data = {
    ...data,
    date: datePart,
    start_time: timePart,
  };

  const res = await insertScreening(data);

  if (res.error) toast.error(res.error);

  if (res.message) toast.success(res.message);
}

export default NewScreening;
