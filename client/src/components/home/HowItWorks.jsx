import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Profile",
      desc: "Set up your child’s profile in seconds and personalize learning.",
    },
    {
      title: "Choose Course",
      desc: "Pick fun AR-powered courses designed for young learners.",
    },
    {
      title: "Start Learning",
      desc: "Explore, play, and learn with interactive AR experiences.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-28">

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900">
          How{" "}
          <span className="text-yellow-400">
            It Works
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-16">
          Get started in just three simple steps and unlock the joy of learning.
        </p>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 rounded-full" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition"
            >
              {/* Step Number */}
              <div className="
                mx-auto mb-6 w-14 h-14 rounded-full
                flex items-center justify-center
                text-xl font-bold text-black
                bg-gradient-to-r from-yellow-400 to-yellow-500
                shadow-lg
              ">
                {i + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
