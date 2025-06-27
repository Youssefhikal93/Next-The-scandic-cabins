import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";
// import { formatDate } from "../_lib/helpers";
import Image from "next/image";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name.split(" ")[0];
  const userBookings = await getBookings(session?.user?.guestId);

  return (
    <div className="px-2 py-6 sm:px-6 lg:px-8 translate-x-[-30px]">
      {/* Mobile-first heading with padding adjustment */}
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7 pl-2 sm:pl-0 border-b">
        Welcome, {firstName}!
      </h2>

      {/* User Profile - stacked on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-primary-900 p-4 sm:p-6 rounded-lg mb-6">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden">
          <Image
            src={session?.user.image}
            alt={session?.user.name}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-medium">
            {session?.user.name}
          </h3>
          <p className="text-sm sm:text-base text-primary-300">
            {session?.user.email}
          </p>
        </div>
      </div>

      {/* Stats - single column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8">
        <StatCard
          title="Upcoming Stays"
          value={
            userBookings?.filter((b) => new Date(b.startDate) > new Date())
              .length || 0
          }
        />
        <StatCard title="Total Bookings" value={userBookings?.length || 0} />
        <StatCard
          title="Loyalty Points"
          value={(userBookings?.length || 0) * 100}
        />
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value }) {
  return (
    <div className="bg-primary-900 p-4 sm:p-6 rounded-lg">
      <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-accent-400">{value}</p>
    </div>
  );
}
