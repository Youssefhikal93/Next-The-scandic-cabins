import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials";

import { createGuest, getGuest } from "./data-service";
import { createAuthClient } from "./supabase";

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
      // Passwords are verified by Supabase Auth — we never store or hash
      // them ourselves. NextAuth just owns the session afterwards.
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabaseAuth = createAuthClient();
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email: String(credentials.email).trim(),
          password: String(credentials.password),
        });

        if (error || !data?.user) return null;

        return {
          email: data.user.email,
          name:
            data.user.user_metadata?.fullName ??
            data.user.email.split("@").at(0),
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
