import { Target, Moon, HeartPulse } from "lucide-react";

export default function Mession() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
          <Target size={16} />
          Our Mission
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          We help you sleep better, live better
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          At SleepTracker, we aim to help individuals achieve better sleep and overall well-being by providing insights into their sleep patterns.
        </p>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl border bg-linear-to-b from-purple-50 to-white shadow-sm hover:shadow-md transition">
            <Moon className="text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Better Sleep</h3>
            <p className="text-gray-500 text-sm">
              Understand your sleep cycles and improve your rest quality.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-linear-to-b from-pink-50 to-white shadow-sm hover:shadow-md transition">
            <HeartPulse className="text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Health Focus</h3>
            <p className="text-gray-500 text-sm">
              Improve your health through better sleep habits.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-linear-to-b from-indigo-50 to-white shadow-sm hover:shadow-md transition">
            <Target className="text-indigo-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Smart Insights</h3>
            <p className="text-gray-500 text-sm">
              AI-driven insights to optimize your sleep routine.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}