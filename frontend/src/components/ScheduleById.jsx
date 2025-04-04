import ScheduleItem from "./ScheduleItem";

function ScheduleById({ schedule }) {
  console.log(schedule);

  if (!schedule) return null;

  return (
    <ul>
      <h3>Screenings Today</h3>

      {schedule.map((item) => (
        <ScheduleItem data={item} key={item.screening_id} />
      ))}
    </ul>
  );
}

export default ScheduleById;
