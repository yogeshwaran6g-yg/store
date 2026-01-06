import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-28 bg-gradient-to-b from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our platform blends{" "}
            <span className="font-semibold text-purple-600">
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
              <p className="text-gray-600">Play-based & interactive learning</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <p className="text-gray-600">Safe and child-friendly environment</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <p className="text-gray-600">Designed for curiosity & creativity</p>
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
