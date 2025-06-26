"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  BuildingOffice2Icon,
  InformationCircleIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";

export default function MobileNavigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-button")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hamburger-button relative z-50 p-2 -mr-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-primary-100" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-primary-100" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-primary-950/95 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8 h-full flex flex-col">
          <nav className="mobile-menu">
            <ul className="flex flex-col gap-6 text-lg">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <HomeIcon className="h-5 w-5 text-accent-400" />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/cabins"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <BuildingOffice2Icon className="h-5 w-5 text-accent-400" />
                  <span>Cabins</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <InformationCircleIcon className="h-5 w-5 text-accent-400" />
                  <span>About</span>
                </Link>
              </li>

              <li className="pt-4 mt-4 border-t border-primary-700">
                {session?.user?.image ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          fill
                          className="rounded-full object-cover"
                          src={session.user.image}
                          alt={session.user.name}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span>My Account</span>
                    </Link>
                    <SignOutButton />
                  </>
                ) : (
                  <Link
                    href="/account"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-800 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserIcon className="h-5 w-5 text-accent-400" />
                    <span>Guest Area</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
