import React, { useState } from 'react';
import './SeatReservation.css';

const SeatReservation = () => {
  const [seats, setSeats] = useState([
    [1, 2, 3, 'X', 5, 6, 7],
    [8, 9, 10, 11, 12, 'X', 'X'],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    ['X', 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42],
    [43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 'X', 'X', 'X', 'X'],
    [57, 58, 59, 60, 61, 62, 63],
    [64, 65, 66, 67, 68, 69, 70],
    [71, 72, 'X', 74, 75, 76, 77],
    ['X', 'X', 78, 79, 80, 'X', 'X']
  ]);

  const [booking, setBooking] = useState([]);

  const reserveSeat = (rowIndex, colIndex) => {
    const updatedSeats = [...seats];
    if (updatedSeats[rowIndex][colIndex] === 'X') {
      return; // Seat is already booked
    }

    updatedSeats[rowIndex][colIndex] = 'X';

    setSeats(updatedSeats);
    setBooking([...booking, updatedSeats[rowIndex][colIndex]]);
  };

  const reserveSeats = (numSeats) => {
    if (numSeats > 7) {
      alert('You can reserve up to 7 seats at a time.');
      return;
    }

    const updatedSeats = [...seats];
    const bookedSeats = [];

    // Loop through the seat layout to find available seats
    for (let row = 0; row < updatedSeats.length; row++) {
      let startCol = -1;
      let consecutiveSeats = 0;

      for (let col = 0; col < updatedSeats[row].length; col++) {
        if (updatedSeats[row][col] !== 'X') {
          if (startCol === -1) {
            startCol = col;
          }
          consecutiveSeats++;

          if (consecutiveSeats === numSeats) {
            for (let i = startCol; i < startCol + numSeats; i++) {
              bookedSeats.push(updatedSeats[row][i]);
              updatedSeats[row][i] = 'X';
            }
            setBooking(bookedSeats);
            setSeats(updatedSeats);
            return;
          }
        } else {
          startCol = -1;
          consecutiveSeats = 0;
        }
      }
    }

    // If enough seats are still not available
    setBooking([]);
  };

  return (
    <div className="seat-reservation">
      <h2>Seat Reservation</h2>
      <div className="seat-layout">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, colIndex) => {
              const isBooked = seat === 'X';
              const seatClass = isBooked ? 'booked' : 'available';
              return (
                <div
                  key={colIndex}
                  className={`seat ${seatClass}`}
                  onClick={() => reserveSeat(rowIndex, colIndex)}
                >
                  {isBooked ? 'X' : seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => reserveSeats(1)}>Reserve 1 Seat</button>
        <button onClick={() => reserveSeats(2)}>Reserve 2 Seats</button>
        <button onClick={() => reserveSeats(3)}>Reserve 3 Seats</button>
        <button onClick={() => reserveSeats(4)}>Reserve 4 Seats</button>
        <button onClick={() => reserveSeats(5)}>Reserve 5 Seats</button>
        <button onClick={() => reserveSeats(6)}>Reserve 6 Seats</button>
        <button onClick={() => reserveSeats(7)}>Reserve 7 Seats</button>
      </div>
      <div>
        <h3>Booked Seats:</h3>
        {booking.length > 0 ? (
          <ul>
            {booking.map((seatNumber) => (
              <li key={seatNumber}>Seat {seatNumber}</li>
            ))}
          </ul>
        ) : (
          <p>No seats booked</p>
        )}
      </div>
    </div>
  );
};

export default SeatReservation;