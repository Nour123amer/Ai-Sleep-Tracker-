import { Button } from "@/components/ui/button";
import { ArrowRight, Moon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex w-full flex-col-reverse items-center justify-between gap-10 px-6 py-20 md:flex-row md:px-16 lg:px-24">

      {/* glow background */}
      <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-400/20 blur-3xl"></div>

      {/* TEXT */}
      <div className="relative max-w-xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-purple-600">
          <Moon className="h-4 w-4" />
          Sleep Better Daily
        </div>

        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Track your{" "}
          <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            sleep quality
          </span>{" "}
          effortlessly
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Improve your health, understand your sleep cycles, and wake up
          feeling more energized every day.
        </p>

        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline">Learn More</Button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-2xl"></div>

        <img
          src="/sleep-tracker.png"
          alt="sleep"
          className="relative w-[320px] rounded-2xl shadow-2xl md:w-[420px]"
        />
      </div>
    </section>
  );
}