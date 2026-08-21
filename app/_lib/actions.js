"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { createAuthClient } from "./supabase";
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

  // The confirmation email must send people back HERE (the guest site).
  // Without this, Supabase redirects to the project's Site URL — the admin
  // dashboard. Derived from the request so it works in dev and production.
  const headersList = await headers();
  const origin =
    headersList.get("origin") ?? `https://${headersList.get("host")}`;

  // Create the account in Supabase Auth (it hashes and stores the password).
  // role: "guest" marks this as a guest-site account — the management app
  // refuses to log these users in.
  const supabaseAuth = createAuthClient();
  const { error: signUpError } = await supabaseAuth.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, role: "guest" },
      emailRedirectTo: `${origin}/login`,
    },
  });

  if (signUpError) return { error: signUpError.message };

  // Log the new user straight in. The signIn callback in auth.js creates the
  // matching row in the guests table on first login.
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError)
      // Happens when Supabase requires email confirmation before login
      return {
        success:
          "Account created! Please confirm your email address, then log in.",
      };
    throw error;
  }
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
