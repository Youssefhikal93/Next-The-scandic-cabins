"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  createGuest,
  deleteBooking,
  getBooking,
  getBookings,
  getGuest,
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

// Email + password login. Verification happens in the Credentials provider
// (auth.js), which checks against Supabase Auth.
export async function signInWithCredentialsAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password)
    return { error: "Please provide both email and password." };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError)
      return { error: "Invalid email or password." };
    // signIn throws a redirect on success — let it through
    throw error;
  }
}

export async function signUpAction(prevState, formData) {
  const fullName = formData.get("fullName")?.trim();
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  if (!fullName || !email || !password)
    return { error: "Please fill in all fields." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };
  if (password !== passwordConfirm)
    return { error: "Passwords do not match." };

  // Email/password guests live ONLY in the guests table — same as Google
  // users. Nothing touches Supabase Auth; we store a bcrypt hash on the
  // guest row and the Credentials provider verifies against it.
  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const existingGuest = await getGuest(normalizedEmail);

    if (existingGuest?.password)
      return { error: "An account with this email already exists." };

    if (existingGuest) {
      // Guest row already exists from a Google login — attach a password to it
      await updateGuest(existingGuest.id, { password: passwordHash });
    } else {
      await createGuest({
        email: normalizedEmail,
        fullName,
        password: passwordHash,
      });
    }
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      error: "Could not create your account. Please try again later.",
    };
  }

  // Log the new guest straight in — no confirmation email involved
  await signIn("credentials", {
    email: normalizedEmail,
    password,
    redirectTo: "/account",
  });
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
