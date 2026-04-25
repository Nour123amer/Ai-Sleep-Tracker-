import React from "react";
import { ArrowRight, MoonStar } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white overflow-hidden">
      
      {/* glow background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">

        {/* icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <MoonStar size={26} />
          </div>
        </div>

        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Sleep Better?
        </h2>

        <p className="text-white/80 text-lg mb-8">
          Join SleepTracker today and take the first step towards better sleep and a healthier life.
        </p>

        {/* button */}
        <button className="group bg-white text-purple-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition">
          Get Started
          <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
        </button>

      </div>
    </section>
  );
}