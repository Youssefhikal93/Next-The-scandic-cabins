import Image from "next/image";
import { auth } from "../_lib/auth";
import Link from "next/link";

async function NavigationLinkLogin() {
  const session = await auth();
  return (
    // <>
    session?.user?.image ? (
      <Link
        href="/account"
        className="hover:text-accent-400 transition-colors flex items-center gap-4"
      >
        <div className="flex relative w-10 h-10">
          <span>{session.user.name}</span>
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
      <Link href="/account" className="hover:text-accent-400 transition-colors">
        Guest area
      </Link>
    )
    // </>
  );
}

export default NavigationLinkLogin;
