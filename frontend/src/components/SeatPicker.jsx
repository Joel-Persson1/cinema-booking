function SeatPicker({
  seatsPerRow,
  bookedSeats,
  numTickets,
  selectedSeats,
  setSelectedSeats,
}) {
  function handleSeatClick(e, seatId) {
    e.preventDefault();

    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      const updated = selectedSeats.filter((seat) => seat !== seatId);
      setSelectedSeats(updated);

      return;
    }

    if (selectedSeats.length >= numTickets) return;

    setSelectedSeats((selectedSeats) => [...selectedSeats, seatId]);
  }

  return (
    <div className="seat-picker">
      {seatsPerRow.map((seatsInRow, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {Array.from({ length: seatsInRow }, (_, seatIndex) => {
            const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);
            let className = "seat";
            if (isBooked) className += " booked";
            else if (isSelected) className += " selected";
            return (
              <button
                key={seatId}
                onClick={(e) => handleSeatClick(e, seatId)}
                disabled={isBooked}
                className={className}
              >
                {isBooked && `❌`}
                {isSelected && `✔️`}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatPicker;
