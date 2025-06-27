import SignInButton from "../_components/SignInButton";
import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <form action={signInAction}>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-xl md:text-3xl font-semibold">
          Sign in to access your guest area
        </h2>
        <label htmlFor="Email" className="text-sm md:text-base">
          Email
        </label>
        <input
          name="email"
          id="email"
          className="px-3 py-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-72 shadow-sm rounded-sm text-sm md:text-base"
          placeholder="email..."
        ></input>
        <h2 className="text-xl md:text-3xl font-semibold">Or</h2>
        <SignInButton />
      </div>
    </form>
  );
}
