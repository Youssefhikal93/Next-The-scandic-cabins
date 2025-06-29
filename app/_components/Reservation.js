import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import { ReservationProvider } from "./ReservationContext";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDate] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800  mt-10">
      <DateSelector settings={settings} bookedDate={bookedDate} cabin={cabin} />
      {session?.user ? (
        <ReservationForm user={session.user} cabin={cabin} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
