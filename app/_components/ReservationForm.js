"use client";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
import { startTransition, useTransition } from "react";
import { useRouter } from "next/navigation";

function ReservationForm({ cabin, user }) {
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { range, resetRange } = useReservation();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      // both achving the same results
      await createReservationWithData(formData);
      // await createReservation(bookingData, formData);

      // Reset range before redirect
      resetRange();
      router.push("/cabins/thankyou");
    });
  };
  return (
    <div className="scale-[1.01]">
      {/* User Info Bar */}
      <div className="bg-primary-800 text-primary-300 mt-2 md:mt-0 px-4 md:px-8 min-h-20 lg:px-16 py-2 flex justify-between items-center">
        <p className="text-sm md:text-base">Logged in as</p>

        <div className="flex gap-2 md:gap-4 items-center">
          <div className="relative h-6 w-6 md:h-8 md:w-8">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full object-cover"
              src={user.image}
              alt={user.name}
              fill
              sizes="(max-width: 768px) 24px, 32px"
            />
          </div>
          <p className="text-sm md:text-base truncate max-w-[100px] md:max-w-none">
            {user.name}
          </p>
        </div>
      </div>

      {/* Reservation Form */}
      <form
        // Redirecting in the action cauing refreshing the page which dosnt affect the state of reset range
        // action={async (formData) => {
        //   await createReservationWithData(formData);
        //   resetRange();
        // }}
        action={handleSubmit}
        className="bg-primary-900 py-6 px-4 sm:py-8 sm:px-8 lg:py-10 lg:px-16 text-base md:text-lg flex gap-4 md:gap-5 flex-col"
      >
        {/* Guests Select */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="numGuests" className="text-sm md:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 py-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base"
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

        {/* Observations */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="observations" className="text-sm md:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 py-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
            rows={3}
          />
        </div>

        {/* Submit Area */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-4">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-xs sm:text-sm md:text-base">
              Start by selecting dates
            </p>
          ) : (
            <div className="w-full sm:w-auto">
              <SubmitButton className="w-full sm:w-auto">
                Reserve now
              </SubmitButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
