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
    <Link to={`/booking/${booking_reference}`} style={{ textDecoration: 'none' }}>
      <img src={poster_url} alt="movie poster for booked movie" />
      <button
        type="button"
        className="booking-title-btn"
        style={{
          display: 'block',
          width: '100%',
          background: '#ffb347',
          color: '#181a2b',
          fontWeight: 700,
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '8px',
          padding: '0.7rem 1rem',
          margin: '1rem 0 0.7rem 0',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        {title} {screening_date} {runtime.toString().includes('min') ? runtime : `${runtime} min`}
      </button>
      <p style={{margin: '0.5rem 0 0.2rem 0', color: '#fff', fontWeight: 500}}>
        {num_tickets}, {theater_name}, {total_price} kr
      </p>
    </Link>
  );
}

export default BookingBox;
