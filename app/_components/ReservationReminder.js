"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto max-w-[90vw] py-3 px-4 sm:py-4 sm:px-6 md:py-5 md:px-8 rounded-full bg-accent-500 text-primary-800 text-sm sm:text-base font-semibold shadow-lg shadow-slate-900 flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-center">
      <p className="text-center sm:text-left">
        <span className="hidden sm:inline">👋</span> Don&apos;t forget to
        reserve your dates from{" "}
        <span className="font-bold whitespace-nowrap">
          {format(new Date(range.from), "MMM dd")} to{" "}
          {format(new Date(range.to), "MMM dd")}
        </span>
      </p>
      <button
        onClick={resetRange}
        className="rounded-full p-1 hover:bg-accent-600 transition-all self-center sm:self-auto"
        aria-label="Close reminder"
      >
        <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
