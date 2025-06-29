// "use client";
// import { useOptimistic } from "react";
// import ReservationCard from "./ReservationCard";
// import { deleteReservation } from "../_lib/actions";

// function ReservationList({ bookings }) {
//   const [optomisticBookings, optimisticDelete] = useOptimistic(
//     bookings,
//     (curBookings, bookingId) => {
//       return curBookings.filter((booking) => booking.id !== bookingId);
//     }
//   );

//   async function handelDelete(bookingId) {
//     optimisticDelete(bookingId);
//     await deleteReservation(bookingId);
//   }

//   return (
//     <ul className="space-y-6">
//       {optomisticBookings.map((booking) => (
//         <ReservationCard
//           booking={booking}
//           onDelete={handelDelete}
//           key={booking.id}
//         />
//       ))}
//     </ul>
//   );
// }

// export default ReservationList;
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
    <ul className="space-y-4 sm:space-y-6">
      {optomisticBookings.map((booking) => (
        <li key={booking.id}>
          <ReservationCard booking={booking} onDelete={handelDelete} />
        </li>
      ))}
    </ul>
  );
}

export default ReservationList;
