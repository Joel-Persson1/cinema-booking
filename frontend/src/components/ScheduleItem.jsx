import { Link } from "react-router-dom";

function ScheduleItem({ data }) {
  const {
    available_seats,
    start_time,
    theater_capacity,
    theater_name,
    screening_id,
  } = data;

  return (
    <li>
      <Link to={`/booking?screening_id=${screening_id}`}>
        <h4>{start_time}</h4>
        <p>{theater_name}</p>
        <p>{`${available_seats} of ${theater_capacity}`}</p>
      </Link>
    </li>
  );
}

export default ScheduleItem;
