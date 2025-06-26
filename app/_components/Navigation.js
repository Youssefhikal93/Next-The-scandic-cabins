import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import NavigationServer from "./NavigationLinkLogin";
import NavigationLinkLogin from "./NavigationLinkLogin";
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
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <div className="flex relative w-10 h-10">
                <Image
                  fill
                  className="rounded-full h-8 object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Guest area</span>
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
