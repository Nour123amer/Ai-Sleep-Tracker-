import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Navbar() {
  const { userId } = auth();

  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <h1 className="text-xl font-bold text-purple-500">SleepTracker</h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>

        {!userId ? (
          <div className="flex gap-3 items-center">
            <SignInButton />
            <SignUpButton className="bg-purple-500 text-white px-4 py-2 rounded-md">
                Sign Up
            </SignUpButton>
          </div>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  );
}