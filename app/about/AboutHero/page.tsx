import { Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-b from-purple-50 via-white to-white">
      
      {/* decorative blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-300/30 blur-3xl rounded-full" />

      <div className="relative max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
            <Sparkles size={16} />
            About Us
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          About <span className="text-purple-500">SleepTracker</span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Your ultimate companion for tracking sleep, improving habits, and unlocking better mornings.
        </p>
      </div>
    </section>
  );
}