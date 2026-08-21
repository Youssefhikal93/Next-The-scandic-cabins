import Link from "next/link";
import { auth } from "../_lib/auth";
import Avatar from "./Avatar";
import MobileButton from "./MobileButton";

export default async function Navigation() {
  const session = await auth();
  // console.log(session);
  return (
    <nav className="z-10 text-xl">
      <MobileButton session={session} />
      <ul className=" gap-16 items-center hidden md:flex">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        {/* <li>{children}</li> */}
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Avatar
                name={session.user.name}
                image={session.user.image}
                sizeClasses="h-10 w-10"
              />
              <span>{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
