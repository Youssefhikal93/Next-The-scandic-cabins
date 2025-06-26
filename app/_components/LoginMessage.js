import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid border border-l-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <span className="my-5">
          <Link
            href="/login"
            className="text-primary-950 bg-accent-400 px-3 py-2 rounded-b-md mb-4 hover:bg-accent-500 hover:text-white"
          >
            login
          </Link>{" "}
        </span>
        to reserve this <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
