import { Star } from "lucide-react";

export default function Testimeniols() {
  const data = [
    {
      text: "SleepTracker completely transformed my sleep schedule.",
      name: "Sarah L.",
    },
    {
      text: "Finally fixed my insomnia using this app!",
      name: "John D.",
    },
    {
      text: "Super clean UI and very accurate tracking.",
      name: "Emily R.",
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-gray-50 to-white px-6 py-20 md:px-16">

      <h2 className="mb-12 text-center text-3xl font-bold">
        What Our Users Say
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {data.map((item, i) => (
          <div
            key={i}
            className="group relative rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            {/* glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-100 to-pink-100 opacity-0 blur-xl transition group-hover:opacity-100"></div>

            <div className="relative space-y-4">
              {/* stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 italic">"{item.text}"</p>

              <span className="font-semibold text-purple-600">
                - {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}