import Image from "next/image";

function SignInButton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <button
        type="submit"
        name="provider"
        value="google"
        className="flex items-center gap-6 text-lg border  hover:text-primary-950 border-primary-300 px-10 py-4 font-medium hover:bg-gray-50 transition-colors w-full justify-center"
      >
        <div className="relative">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
        </div>
        <span>Continue with Google</span>
      </button>

  {    <button
        type="submit"
        name="provider"
        value="facebook"
        className="flex items-center gap-6 text-md border  hover:text-primary-950 border-primary-300 px-10 py-4 font-medium hover:bg-gray-50 transition-colors w-full justify-center"
      >
        <div className="relative">
          <Image
            src="https://authjs.dev/img/providers/facebook.svg"
            alt="Facebook logo"
            height="24"
            width="24"
          />
        </div>

        <span>Continue with Facebook</span>
      </button> }
    </div>
  );
}

export default SignInButton;
