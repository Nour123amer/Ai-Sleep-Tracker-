import React from "react";
import { BookOpen, Rocket, Brain } from "lucide-react";

export default function OurStory() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-purple-50 to-white">
      
      {/* glow background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-purple-300/20 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* badge */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
          <BookOpen size={16} />
          Our Story
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Built with passion for{" "}
          <span className="text-purple-500">better sleep</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
          SleepTracker was created to address the growing need for better sleep management tools. Our team of sleep experts and technologists developed a platform that combines cutting-edge technology with actionable insights. Since our launch, we’ve helped countless users achieve better sleep and improve their overall health.
        </p>

        {/* story cards */}
        <div className="grid md:grid-cols-3 gap-6 text-left">

          <div className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition">
            <Rocket className="text-purple-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">The Beginning</h3>
            <p className="text-gray-500 text-sm">
              We started with a simple idea: make sleep tracking accessible to everyone.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition">
            <Brain className="text-pink-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">The Innovation</h3>
            <p className="text-gray-500 text-sm">
              We combined AI and sleep science to generate meaningful insights.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition">
            <BookOpen className="text-indigo-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Today</h3>
            <p className="text-gray-500 text-sm">
              Helping thousands of users improve their sleep and lifestyle.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}