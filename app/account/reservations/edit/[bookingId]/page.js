import Spinner from "@/app/_components/Spinner";
import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { Suspense } from "react";

export default async function Page({ params }) {
  const {
    id: bookingId,
    observations,
    numGuests,
    cabinId,
  } = await getBooking(params.bookingId);
  const { maxCapacity } = await getCabin(cabinId);
  // console.log(params);
  // console.log(booking);

  return (
    <div className="px-0 sm:px-6 lg:px-8 py-6 translate-x-[-40px] w-screen sm:w-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7 border-b">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-6 px-6 sm:py-8 sm:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            rows={4}
          />
        </div>

        <div className="flex justify-end items-center gap-4 sm:gap-6">
          {/* <button className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-sm sm:text-base">
            Update reservation
            </button> */}
          <SubmitButton className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
