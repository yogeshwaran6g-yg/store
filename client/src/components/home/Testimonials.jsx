import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "My child looks forward to learning every single day. The AR experience is magical!",
      name: "Sarah M.",
      role: "Parent of a 6-year-old",
      avatar: "👩‍👦",
    },
    {
      quote:
        "Fun, safe, and educational. I can actually see my child’s curiosity growing.",
      name: "David K.",
      role: "Parent of a 5-year-old",
      avatar: "👨‍👧",
    },
    {
      quote:
        "The best learning platform for kids. Learning feels like play!",
      name: "Anita R.",
      role: "Parent of a 7-year-old",
      avatar: "👩‍👧",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-yellow-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-4">
          What{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Parents Say
          </span>
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-14">
          Trusted by parents who want joyful, safe, and meaningful learning
          experiences for their children.
        </p>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="
                relative bg-white rounded-3xl p-8
                shadow-md hover:shadow-2xl transition
              "
            >
              {/* Quote */}
              <p className="italic text-gray-700 mb-6">
                “{item.quote}”
              </p>

              {/* Divider */}
              <div className="w-12 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{item.avatar}</div>
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
