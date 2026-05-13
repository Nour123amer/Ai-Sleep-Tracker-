import { currentUser } from "@clerk/nextjs/server";
import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { MoonStar } from "lucide-react";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100 ">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
            <MoonStar className="text-white w-5 h-5" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              SleepTracker
            </h1>

            <p className="text-[10px] text-gray-400 -mt-1">
              Track your sleep smartly
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href="/"
            className="hover:text-fuchsia-500 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-fuchsia-500 transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-fuchsia-500 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Auth */}
        {!user ? (
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Sign In
              </button>
            </SignInButton>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-700">
                {user.firstName}
              </p>

              <p className="text-xs text-gray-400">
                Welcome back
              </p>
            </div>

            <div className="p-1 rounded-full ">
              <UserButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}