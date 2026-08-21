"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInWithCredentialsAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function CredentialsLoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithCredentialsAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center gap-4 my-2">
        <span className="h-px flex-1 bg-primary-300" />
        <span className="text-primary-400 text-sm uppercase">or</span>
        <span className="h-px flex-1 bg-primary-300" />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        autoComplete="email"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-600"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        autoComplete="current-password"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-600"
      />

      {state?.error && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent-500 px-10 py-4 text-primary-800 font-semibold hover:bg-accent-700 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 hover:cursor-pointer flex justify-center"
      >
        {isPending ? <SpinnerMini /> : "Sign in with email"}
      </button>

      <p className="text-primary-300 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default CredentialsLoginForm;
