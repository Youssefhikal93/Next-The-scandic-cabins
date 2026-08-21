"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

const inputClasses =
  "px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-600";

function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        type="text"
        name="fullName"
        placeholder="Full name"
        required
        autoComplete="name"
        className={inputClasses}
      />

      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        autoComplete="email"
        className={inputClasses}
      />

      <input
        type="password"
        name="password"
        placeholder="Password (min. 8 characters)"
        required
        minLength={8}
        autoComplete="new-password"
        className={inputClasses}
      />

      <input
        type="password"
        name="passwordConfirm"
        placeholder="Repeat password"
        required
        minLength={8}
        autoComplete="new-password"
        className={inputClasses}
      />

      {state?.error && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent-500 px-10 py-4 text-primary-800 font-semibold hover:bg-accent-700 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 hover:cursor-pointer flex justify-center"
      >
        {isPending ? <SpinnerMini /> : "Create account"}
      </button>

      <p className="text-primary-300 text-sm text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
