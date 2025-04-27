import { useLoaderData } from "react-router-dom";
import { getBookingReference } from "../services/MovieApi";

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
    <section>
      <h2>Booking #{booking_reference}</h2>
      <p>for {user_name}</p>
      <h3>Movie: {movie_title}</h3>
      <img src={poster_url} alt="Movie poster" />

      <p>Theather: {theater_name}</p>
      <p>Starting time: {start_time}</p>

      <p>Number of tickets: {num_tickets}</p>
      <p>Total Price: {total_price}</p>

      <div>
        <h3>Bokade platser:</h3>
        <ul>
          {booked_seats.map((seat, index) => (
            <li key={index}>{`Rad ${seat.split("-")[0]}, Plats ${
              seat.split("-")[1]
            }`}</li>
          ))}
        </ul>
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
