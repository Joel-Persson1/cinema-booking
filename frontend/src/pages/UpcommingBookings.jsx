import { redirect, useLoaderData } from "react-router-dom";
import { checkIfLoggedIn, getUpcommingBookings } from "../services/MovieApi";
import { toast } from "react-hot-toast";
import BookingBox from "../components/BookingBox";

function UpcommingBookings() {
  const bookings = useLoaderData();

  console.log(bookings);

  if (!bookings) return <h1>Loading...</h1>;

  return (
    <>
      {bookings.map((booking) => (
        <BookingBox key={booking.booking_id} booking={booking} />
      ))}
    </>
  );
}

export async function loader() {
  const whoAmI = await checkIfLoggedIn();

  if (whoAmI.error) {
    toast.error(whoAmI.error);
    return redirect("/");
  }

  const fetchedBookings = await getUpcommingBookings(whoAmI.user.id);

  if (fetchedBookings.error) {
    toast.error(bookings.error);
  }

  const bookings = fetchedBookings.map((booking) => ({
    ...booking,
    seats: booking.seats ? booking.seats.split(",") : [],
  }));

  const upcoming = bookings.filter((booking) => {
    let { screening_date, screening_start_time } = booking;

    // Byt ut eventuella "/" till "-" i datumformatet
    screening_date = screening_date.replaceAll("/", "-");

    // Dela upp och padd-a tid (t.ex. 9.0 → 09:00)
    const [hour, minute = "00"] = screening_start_time
      .replace(".", ":")
      .split(":");
    const paddedTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;

    // Kombinera till ISO-tid för jämförelse
    const dateTimeStr = `${screening_date}T${paddedTime}:00`;
    const screeningTime = new Date(dateTimeStr);

    return screeningTime > new Date();
  });

  return upcoming;
}

export default UpcommingBookings;
