import { Form, useActionData, useNavigate } from "react-router-dom";
import { fetchMovieByTitle, insertMovie } from "../services/MovieApi";
import { useEffect } from "react";
import "../styles/NewMovie.css";

function NewMovie() {
  const formMessage = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (formMessage?.success) {
      navigate("/");
    }
  }, [formMessage, navigate]);

  return (
    <div className="new-movie-container">
      <Form method="POST" className="new-movie-form">
        <h1>Add New Movie</h1>
        
        {formMessage?.error && <p className="error-message">{formMessage.error}</p>}

        <div className="form-group">
          <label htmlFor="title">Movie Title</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            placeholder="Enter movie title" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="trailer_url">Trailer URL</label>
          <input
            id="trailer_url"
            name="trailer_url"
            type="text"
            placeholder="Enter trailer URL"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          <span>Add Movie</span>
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const movieData = await request.formData();

  const data = Object.fromEntries(movieData);

  const omdbAnswer = await fetchMovieByTitle(data.title);

  if (omdbAnswer.Response === "False") {
    return { error: "The movie was not found" };
  }

  if (omdbAnswer);

  omdbAnswer.trailer_url = data.trailer_url;

  console.log(omdbAnswer);

  const { message, error } = await insertMovie(omdbAnswer);

  if (message) return { success: message };

  if (error) {
    console.log(error);
    return { error: error };
  }
}

export default NewMovie;
