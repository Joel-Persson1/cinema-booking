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
      <Link 
        to={`/booking?screening_id=${screening_id}`}
        className="screening-button"
      >
        <div>{start_time}</div>
        <div>{theater_name}</div>
        <div>{`${available_seats} of ${theater_capacity}`}</div>
      </Link>
    </li>
  );
}

export default ScheduleItem;
