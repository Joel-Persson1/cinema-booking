import { useLoaderData } from "react-router-dom";
import { getBookingReference } from "../services/MovieApi";
import "../styles/BookingReference.css";

function BookingReference() {
  const booking = useLoaderData();

  const {
    booked_seats,
    booking_reference,
    num_tickets,
    total_price,
    movie_title,
    poster_url,
    start_time,
    theater_name,
    user_name,
  } = booking;

  return (
    <section className="booking-container">
      <div className="booking-header">
        <h2>Booking #{booking_reference}</h2>
        <p>for {user_name}</p>
      </div>

      <div className="booking-content">
        <div className="movie-poster">
          <img src={poster_url} alt={`${movie_title} poster`} />
        </div>

        <div className="booking-details">
          <h3>{movie_title}</h3>
          
          <div className="booking-info">
            <p>
              <strong>Theater:</strong>
              {theater_name}
            </p>
            <p>
              <strong>Start Time:</strong>
              {start_time}
            </p>
            <p>
              <strong>Tickets:</strong>
              {num_tickets}
            </p>
            <p>
              <strong>Total Price:</strong>
              {total_price} kr
            </p>
          </div>

          <div className="seats-section">
            <h3>Booked Seats</h3>
            <ul className="seats-list">
              {booked_seats.map((seat, index) => (
                <li key={index}>
                  Row {seat.split("-")[0]}, Seat {seat.split("-")[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function loader({ params }) {
  const booking = await getBookingReference(params.bookingReference);

  console.log(booking);

  return booking;
}

export default BookingReference;
