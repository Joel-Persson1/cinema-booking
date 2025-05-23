import { redirect, useLoaderData } from "react-router-dom";
import { checkIfLoggedIn, getUpcommingBookings } from "../services/MovieApi";
import { toast } from "react-hot-toast";
import BookingBox from "../components/BookingBox";
import { useEffect } from "react";
import "../styles/BookingHistory.css";

function BookingHistory() {
  const bookings = useLoaderData();

  useEffect(() => {
    document.body.classList.add("booking-history-page");
    return () => document.body.classList.remove("booking-history-page");
  }, []);

  console.log(bookings);

  if (!bookings) return <h1>Loading...</h1>;

  return (
    <div className="booking-history-container">
      <h1 className="booking-history-title">Dina tidigare bokningar</h1>
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

  console.log(fetchedBookings);

  if (fetchedBookings.error) {
    toast.error(bookings.error);
  }

  const bookings = fetchedBookings.map((booking) => ({
    ...booking,
    seats: booking.seats ? booking.seats.split(",") : [],
  }));

  console.log(bookings);

  const history = bookings.filter((booking) => {
    let { screening_date, screening_start_time } = booking;

    // Standardisera datumformat till YYYY-MM-DD
    screening_date = screening_date.replaceAll("/", "-");

    // Fixar start_time-format till HH:MM
    const [hour, minute = "00"] = screening_start_time
      .replace(".", ":")
      .split(":");
    const paddedTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;

    // Kombinera datum och tid till ISO-sträng
    const dateTimeStr = `${screening_date}T${paddedTime}:00`;
    const screeningTime = new Date(dateTimeStr);

    return screeningTime <= new Date();
  });

  return history;
}

export default BookingHistory;
