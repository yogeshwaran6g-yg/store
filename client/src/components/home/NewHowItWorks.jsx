import { motion } from "framer-motion";

export default function NewHowItWorks() {
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
    <section className="py-28 bg-gradient-to-b from-white via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-4">
          How{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            It Works
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-16">
          Get started in just three simple steps and unlock the joy of learning.
        </p>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-10">

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
