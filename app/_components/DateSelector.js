"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
// import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useState } from "react";
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
  // console.log(defaultClassNames);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={currentDate}
        endMonth={endDate}
        // toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        // onSelect={(range) => setRange(range)}
        onSelect={(selectedRange) => setRange(selectedRange || {})}
        selected={displayRange}
        disabled={(curDate) =>
          isPast(curDate) || bookedDate.some((date) => isSameDay(date, curDate))
        }
        // classNames={{
        //   root: "rdp",
        //   // selected: `bg-amber-500 border-amber-500 text-white`,
        // }}
        // classNames={{
        //   today: `border-amber-500`, // Add a border to today's date
        //   selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
        //   root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
        //   chevron: `${defaultClassNames.chevron} fill-amber-500`,
        //   range_start: `${defaultClassNames.range_start} fill-amber-500`,
        //   range_middle: `${defaultClassNames.range_middle} fill-amber-500`,
        //   range_end: `${defaultClassNames.range_middle} fill-amber-500`,
        // }}
        classNames={{
          // root: `${defaultClassNames.root} shadow-lg p-5`, // Root container
          // today: `${defaultClassNames.day_today} text-accent-500 bg-primary-800`, // Today's date border

          // months_dropdown: `bg-primary-800 border border-primary-300 rounded-md p-1`,
          // years_dropdown: `bg-primary-800 border border-primary-300 rounded-md p-1`,

          // selected: "bg-accent-700 text-white hover:bg-accent-600",
          // range_start: "bg-accent-600 text-white rounded-l-full",
          // range_end: "bg-accent-600 text-white rounded-r-full",
          // range_middle: "bg-accent-400 text-white",
          // day: "w-10 h-10 rounded-full hover:bg-accent-900",
          // chevron: "bg-accent-500 mx-1 mb-1 rounded",
          // dropdown: "bg-primary-800 border border-primary-300 rounded-md p-1",
          root: `${defaultClassNames.root} shadow-lg p-5`,
          today: `${defaultClassNames.day_today} text-accent-500 bg-primary-800`,
          months_dropdown: `bg-primary-800 border border-primary-300 rounded-md p-1`,
          years_dropdown: `bg-primary-800 border border-primary-300 rounded-md p-1`,
          selected: "bg-accent-700 text-white hover:bg-accent-600",
          range_start: "bg-accent-600 text-white rounded-l-full",
          range_end: "bg-accent-600 text-white rounded-r-full",
          range_middle: "bg-accent-400 text-white",
          day: "w-10 h-10 rounded-full hover:bg-accent-900",
          chevron: "bg-accent-500 mx-1 mb-1 rounded",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-full">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2  items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold hover:cursor-progress"
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
