// import ReservationCard from "@/app/_components/ReservationCard";
// import ReservationList from "@/app/_components/ReservationList";
// import { auth } from "@/app/_lib/auth";
// import { getBookings } from "@/app/_lib/data-service";
// import Link from "next/link";
// export const metadata = {
//   title: "Reservations",
// };
// export default async function Page() {
//   const session = await auth();
//   const bookings = await getBookings(session.user.guestId);
//   return (
//     <div>
//       <h2 className="font-semibold text-2xl text-accent-400 mb-7">
//         Your reservations
//       </h2>

//       {bookings.length === 0 ? (
//         <p className="text-lg">
//           You have no reservations yet. Check out our{" "}
//           <Link className="underline text-accent-500" href="/cabins">
//             luxury cabins &rarr;
//           </Link>
//         </p>
//       ) : (
//         //RELACING WITH OPTEMISTIC HOOK
//         // <ul className="space-y-6">
//         //   {bookings.map((booking) => (
//         //     <ReservationCard booking={booking} key={booking.id} />
//         //   ))}
//         // </ul>
//         <ReservationList bookings={bookings} />
//       )}
//     </div>
//   );
// }
import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div className="px-1 sm:px-6 lg:px-8 py-6 translate-x-[-40px]">
      {/* Responsive heading with adjusted spacing */}
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-base sm:text-lg">
          You have no reservations yet. Check out our{" "}
          <Link
            className="underline text-accent-500 hover:text-accent-400 transition-colors"
            href="/cabins"
          >
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        // RELACING WITH OPTEMISTIC HOOK
        // <ul className="space-y-6">
        //   {bookings.map((booking) => (
        //     <ReservationCard booking={booking} key={booking.id} />
        //   ))}
        // </ul>
        <div className="space-y-4 sm:space-y-6">
          <ReservationList bookings={bookings} />
        </div>
      )}
    </div>
  );
}
