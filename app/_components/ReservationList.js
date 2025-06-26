"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optomisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handelDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optomisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handelDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
