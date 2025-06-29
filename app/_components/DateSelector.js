"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import "react-day-picker/style.css";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDate }) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDate) ? {} : range;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;
  const currentDate = new Date();
  const endDate = new Date(currentDate.getFullYear() + 5, 11);
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={currentDate}
        endMonth={endDate}
        captionLayout="dropdown"
        numberOfMonths={1}
        onSelect={(selectedRange) => setRange(selectedRange || {})}
        selected={displayRange}
        disabled={(curDate) =>
          isPast(curDate) || bookedDate.some((date) => isSameDay(date, curDate))
        }
        classNames={{
          root: `${defaultClassNames.root} shadow-lg p-5`,
          today: `${defaultClassNames.day_today} text-accent-500 bg-primary-800`,
          months_dropdown: `bg-primary-900 border border-primary-300 rounded-md p-1`,
          years_dropdown: `bg-primary-900 border border-primary-300 rounded-md p-1`,
          selected: "bg-accent-700 text-white hover:bg-accent-600",
          range_start: "bg-accent-600 text-white rounded-l-full",
          range_end: "bg-accent-600 text-white rounded-r-full",
          range_middle: "bg-accent-400 text-white",
          day: "w-10 h-10 rounded-full hover:bg-accent-900",
          chevron: "bg-accent-500 mx-1 mb-1 rounded",
        }}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 gap-4">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <p className="flex items-baseline gap-2 whitespace-nowrap">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700 text-sm sm:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>

          {numNights ? (
            <>
              <div className="bg-accent-600 px-3 py-2 rounded-md flex items-center gap-1">
                <span className="text-xl sm:text-2xl">&times;</span>
                <span className="text-xl sm:text-2xl">{numNights}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm sm:text-base font-bold uppercase">
                  Total
                </span>
                <span className="text-xl sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </div>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm font-semibold hover:bg-primary-800 hover:text-white transition-colors"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
