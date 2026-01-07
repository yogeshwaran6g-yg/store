import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative overflow-hidden py-16 md:py-28">

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-gray-900">
            About{" "}
            <span className="text-yellow-400">
              Our Platform
            </span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our platform blends{" "}
            <span className="font-semibold text-yellow-300">
              fun, creativity, and augmented reality
            </span>{" "}
            to help children learn naturally through play.
            We create magical experiences that spark curiosity and
            build confidence in young learners.
          </p>

          {/* Highlight Points */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <p className="text-gray-700">Play-based & interactive learning</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-300" />
              <p className="text-gray-700">Safe and child-friendly environment</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-300" />
              <p className="text-gray-700">Designed for curiosity & creativity</p>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 rounded-3xl blur-2xl bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 opacity-30" />

          <img
            src="images/about-kids.png"
            alt="About Kids"
            className="
              relative
              rounded-3xl
              shadow-2xl
              border-4 border-white
            "
          />
        </motion.div>

      </div>
    </section>
  );
}
