import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import NavigationLinkLogin from "./NavigationLinkLogin";
import { Suspense } from "react";
import SpinnerMini from "./SpinnerMini";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        {/* Failed trail to inject the server component as a child */}
        {/* <Navigation>
            <NavigationLinkLogin />
          </Navigation> */}
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
