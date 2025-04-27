import { Form, Navigate, redirect, useLoaderData } from "react-router-dom";
import {
  checkIfLoggedIn,
  getScreeningWithMovie,
  insertBooking,
} from "../services/MovieApi";
import { formatScreeningDate } from "../helpers/convertToDate";
import { useEffect, useState } from "react";
import SeatPicker from "../components/SeatPicker";
import "../styles/BookingPage.css";
import { createBookingNumber } from "../services/generateBookingNumber";

function Cart() {
  const info = useLoaderData();

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pensioner, setPensioner] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalTickets = adults + children + pensioner;
  const disabled = selectedSeats.length < totalTickets;
  const date = formatScreeningDate(info.date);

  // Format selected seats as "Row X Seat Y"
  const formatSelectedSeats = () => {
    if (selectedSeats.length === 0) return "";

    // Convert string format to object
    const seatObjects = selectedSeats.map((seatId) => {
      const [row, seat] = seatId.split("-").map(Number);
      return { row, seat };
    });

    // Sort seats
    const sortedSeats = seatObjects.sort((a, b) => {
      if (a.row === b.row) {
        return a.seat - b.seat;
      }
      return a.row - b.row;
    });

    return `Row ${sortedSeats[0].row} Seat ${sortedSeats
      .map((seat) => seat.seat)
      .join(", ")}`;
  };

  function increment(e, set, value) {
    e.preventDefault();
    set(value + 1);
  }

  function decrement(e, set, value) {
    e.preventDefault();
    if (value <= 0) return;
    set(value - 1);
  }

  function calculatePrice() {
    const sum = [];

    if (adults >= 1) {
      const adultPrice = adults * 155;
      sum.push(adultPrice);
    }

    if (children >= 1) {
      const childrenPrice = children * 120;
      sum.push(childrenPrice);
    }

    if (pensioner >= 1) {
      const pensionerPrice = pensioner * 135;
      sum.push(pensionerPrice);
    }

    return sum.reduce((acc, cur) => acc + cur, 0);
  }

  useEffect(() => {
    const sum = calculatePrice();
    setTotalPrice(sum);
  }, [children, adults, pensioner]);

  return (
    <div className="booking-page">
      <div className="movie-header">
        <h1 className="movie-title">{info.title}</h1>
        <div className="movie-info">
          <span>{info.runtime}</span>
          <span>{info.genre}</span>
          <span>{info.age_limit}</span>
          <span>Theater {info.theater_name}</span>
          <span>{date}</span>
          <span>{info.start_time}</span>
          <span>{info.format}</span>
          <span>{info.language}</span>
        </div>
      </div>

      <div className="booking-sections">
        <div className="tickets-section">
          <h2 className="section-title">Select tickets</h2>

          <div className="ticket-type">
            <div className="ticket-info">
              <span className="ticket-name">Adult</span>
              <span className="ticket-price">155 kr/ticket</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={(e) => decrement(e, setAdults, adults)}
                disabled={adults === 0}
              >
                -
              </button>
              <span>{adults}</span>
              <button onClick={(e) => increment(e, setAdults, adults)}>
                +
              </button>
            </div>
          </div>

          <div className="ticket-type">
            <div className="ticket-info">
              <span className="ticket-name">Children</span>
              <span className="ticket-price">120 kr/ticket</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={(e) => decrement(e, setChildren, children)}
                disabled={children === 0}
              >
                -
              </button>
              <span>{children}</span>
              <button onClick={(e) => increment(e, setChildren, children)}>
                +
              </button>
            </div>
          </div>

          <div className="ticket-type">
            <div className="ticket-info">
              <span className="ticket-name">Senior</span>
              <span className="ticket-price">135 kr/ticket</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={(e) => decrement(e, setPensioner, pensioner)}
                disabled={pensioner === 0}
              >
                -
              </button>
              <span>{pensioner}</span>
              <button onClick={(e) => increment(e, setPensioner, pensioner)}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className="seats-section">
          <h2 className="section-title">Select seats</h2>
          <div className="screen-text">BIG SCREEN</div>

          <Form method="POST">
            <input type="hidden" name="total_price" value={totalPrice} />
            <input
              type="hidden"
              name="selectedSeats"
              value={JSON.stringify(selectedSeats)}
            />
            <input
              type="hidden"
              name="num_tickets"
              value={adults + children + pensioner}
            />
            <input
              type="hidden"
              name="screening_id"
              value={info.screening_id}
            />

            <SeatPicker
              seatsPerRow={info.seats_per_row}
              bookedSeats={info.bookedSeats}
              numTickets={adults + children + pensioner}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />

            {totalTickets > 0 && (
              <div className="submit-container">
                <div className="ticket-summary">
                  <span>{totalTickets} tickets</span>
                  <span>{formatSelectedSeats()}</span>
                  <span>{totalPrice} kr</span>
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={disabled}
                >
                  Book Tickets
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }) {
  const screening_id = Number(request.url.split("=")[1]);
  const information = await getScreeningWithMovie(screening_id);
  return information;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.selectedSeats = JSON.parse(data.selectedSeats);

  const isUserLoggedIn = await checkIfLoggedIn();

  console.log(isUserLoggedIn);

  if (isUserLoggedIn?.error) return redirect("/login");

  if (isUserLoggedIn?.success) {
    const bookingNumber = createBookingNumber();

    data.booking_reference = bookingNumber;
    data.user_id = isUserLoggedIn.user.id;
    data.num_tickets = Number(data.num_tickets);
    data.screening_id = Number(data.screening_id);
    data.total_price = Number(data.total_price);

    const apiData = await insertBooking(data);

    if (apiData.status) return redirect(`/booking/${data.booking_reference}`);
  }
}

export default Cart;
