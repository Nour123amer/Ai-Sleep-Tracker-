import Link from "next/link";
import { GitBranch, Moon, X, } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              SleepTracker
            </span>
          </h2>
          <p className="text-sm text-gray-600 w-full md:w-3/4 lg:w-2/3">
            Track your sleep, improve your health, and wake up refreshed every day.
          </p>

          <div className="flex gap-3 text-gray-500">
            <GitBranch className="h-4 w-4 cursor-pointer hover:text-purple-500" />
            <X className="h-4 w-4 cursor-pointer hover:text-purple-500" />
            <Moon className="h-4 w-4 cursor-pointer hover:text-purple-500" />
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link className="hover:text-purple-500" href="/">
              Home
            </Link>
            <Link className="hover:text-purple-500" href="/about">
              About
            </Link>
            <Link className="hover:text-purple-500" href="/pricing">
              Pricing
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold">Start tracking today</h3>
          <p className="text-sm opacity-90">
            Join thousands improving their sleep quality.
          </p>

          <button className="mt-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:scale-105 transition">
            Get Started
          </button>
        </div>

      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SleepTracker. All rights reserved.
      </div>
    </footer>
  );
}