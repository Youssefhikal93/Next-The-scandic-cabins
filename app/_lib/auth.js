import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Email/password guests live ONLY in the guests table, exactly like
      // Google users — nothing is written to Supabase Auth. The password
      // hash is stored on the guest row and verified here.
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const guest = await getGuest(
          String(credentials.email).trim().toLowerCase()
        );
        // No guest, or a guest created via Google that has no password set
        if (!guest?.password) return null;

        const isValid = await bcrypt.compare(
          String(credentials.password),
          guest.password
        );
        if (!isValid) return null;

        return {
          email: guest.email,
          name: guest.fullName ?? guest.email.split("@").at(0),
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
      // same auth?.user ? true : false
    },
    // Middleware for the signin (Before creating the session)
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    //Runs after the creating the session
    async session({ session, user }) {
      const guest = await getGuest(session?.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
