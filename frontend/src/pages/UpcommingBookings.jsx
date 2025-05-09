import { redirect, useLoaderData } from "react-router-dom";
import { checkIfLoggedIn, getUpcommingBookings } from "../services/MovieApi";
import { toast } from "react-hot-toast";
import BookingBox from "../components/BookingBox";
import { useEffect } from "react";
import "../styles/BookingHistory.css";

function UpcommingBookings() {
  const bookings = useLoaderData();

  useEffect(() => {
    document.body.classList.add("booking-history-page");
    return () => document.body.classList.remove("booking-history-page");
  }, []);

  console.log(bookings);

  if (!bookings) return <h1>Loading...</h1>;

  return (
    <div className="booking-history-container">
      <h1 className="booking-history-title">Dina kommande bokningar</h1>
      {bookings.map((booking) => (
        <BookingBox key={booking.booking_id} booking={booking} />
      ))}
    </div>
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
