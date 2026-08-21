import SignupForm from "../_components/SignupForm";

export const metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-xl md:text-3xl font-semibold">
        Create your guest account
      </h2>
      <SignupForm />
    </div>
  );
}
