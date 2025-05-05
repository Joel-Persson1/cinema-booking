import { Link } from "react-router-dom";

function BookingBox({ booking }) {
  const {
    num_tickets,
    booking_reference,
    poster_url,
    runtime,
    screening_date,
    seats,
    theater_name,
    title,
    total_price,
  } = booking;

  return (
    <Link to={`/booking/${booking_reference}`}>
      <img src={poster_url} alt="movie poster for booked movie" />
      <h3>{title}</h3>
      <p>{screening_date}</p>
      <p>{num_tickets}</p>
      <p>{runtime}</p>
    </Link>
  );
}

export default BookingBox;
