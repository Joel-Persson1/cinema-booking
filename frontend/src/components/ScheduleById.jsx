import { Link } from "react-router-dom";
import ScheduleItem from "./ScheduleItem";

export default function ScheduleById({ schedule }) {
  console.log(schedule);

  if (!schedule) return null;

  return (
    <div>
      <h2 className="screenings-title">Screenings Today</h2>
      
      <div className="seats-status">
        <div className="seats-status-item">
          <div className="seats-status-dot available"></div>
          <span>Lediga platser</span>
        </div>
        <div className="seats-status-item">
          <div className="seats-status-dot few"></div>
          <span>Färre lediga platser</span>
        </div>
        <div className="seats-status-item">
          <div className="seats-status-dot limited"></div>
          <span>Fåtal platser kvar</span>
        </div>
        <div className="seats-status-item">
          <div className="seats-status-dot sold-out"></div>
          <span>Utsålt</span>
        </div>
      </div>

      <ul>
        {schedule.map((screening) => (
          <ScheduleItem key={screening.screening_id} data={screening} />
      ))}
    </ul>
    </div>
  );
}
