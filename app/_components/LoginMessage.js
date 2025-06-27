import Link from "next/link";

function LoginMessage() {
  return (
    <div className="border border-primary-800 rounded-lg p-4 sm:p-6 bg-primary-950/50">
      <p className="text-center text-lg sm:text-xl md:text-2xl py-4 sm:py-6">
        Please{" "}
        <Link
          href="/login"
          className="inline-block mx-1.5 sm:mx-2 text-primary-950 bg-accent-400 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-accent-500 hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium"
        >
          login
        </Link>
        to reserve this cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
