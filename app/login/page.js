import SignInButton from "../_components/SignInButton";
import CredentialsLoginForm from "../_components/CredentialsLoginForm";
import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-xl md:text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <div className="flex flex-col items-center w-full max-w-sm">
        <form action={signInAction} className="w-full">
          <SignInButton />
        </form>

        <CredentialsLoginForm />
      </div>
    </div>
  );
}
