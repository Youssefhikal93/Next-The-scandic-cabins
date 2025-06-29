"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

// export async function signInAction() {
//   await signIn("google", { redirectTo: "/account" });
// }
// export async function signInWithFacebook() {
//   await signIn("facebook", { redirectTo: "/account" });
// }
export async function signInAction(formData) {
  const provider = formData.get("provider");
  await signIn(provider, { redirectTo: "/account" });
}

export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  // console.log(formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,18}$/.test(nationalID))
    throw new Error("Please provide valid national id.");

  const updatedata = { nationality, countryFlag, nationalID };
  // console.log(updatedata);

  await updateGuest(session.user.guestId, updatedata);
  revalidatePath("/account/profile");
  redirect("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in!");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  const observations = formData.get("observations").slice(0, 1000);
  const bookingId = formData.get("bookingId");
  const numGuests = Number(formData.get("numGuests"));
  if (!session) throw new Error("You must be logged in!");
  // console.log(formData);
  // console.log(bookingId);
  const existingBooking = await getBooking(bookingId);
  if (existingBooking.guestId !== session.user.guestId)
    throw new Error("You are not allowed to edit this booking!");

  // const reservationId = formData.get("reservationId");

  const updatedData = { observations, numGuests };
  await updateBooking(bookingId, updatedData);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  // Object.entries(formData.entries())

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 10000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);
  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingData.id}`);
  // redirect("/cabins/thankyou");
}
