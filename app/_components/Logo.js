import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/logo";
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src={logo} alt="The Scandic Cabins logo" /> */}
      <Image
        src="/logo.png"
        height="40"
        width="40"
        quality={100}
        alt="The Scandic Cabins logo"
        className=" w-10 h-10 md:w-[60px] md:h-[60px]"
      />
      <span className="text-lg md:text-xl font-semibold text-primary-100">
        The Scandic Cabins
      </span>
    </Link>
  );
}

export default Logo;
