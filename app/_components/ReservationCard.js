import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-lg overflow-hidden">
      {/* Image - full width on mobile, fixed width on larger screens */}
      <div className="relative h-48 sm:h-auto sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-square">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
        />
      </div>

      {/* Main content - flex column on mobile, grows on larger screens */}
      <div className="flex-grow p-4 sm:p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              upcoming
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg text-primary-300 mt-2 sm:mt-3">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4 sm:mt-auto items-baseline">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="hidden sm:block text-primary-300">&bull;</p>
          <p className="text-base sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-xs sm:text-sm text-primary-400 mt-2 sm:mt-0 ml-0 sm:ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Actions - row on mobile, column on larger screens */}
      <div className="flex flex-row sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center sm:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-r-0 sm:border-b border-primary-800 flex-grow px-3 py-3 sm:py-4 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span>Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
