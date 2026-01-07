import { motion } from "framer-motion";

export default function Courses() {
  const courses = [
    {
      title: "Alphabet Kit",
      icon: "🔤",
      color: "from-purple-400 to-indigo-400",
      description:
        "Interactive alphabet learning kit designed to build strong language foundations."
    },
    {
      title: "AR Animal Book",
      icon: "🦁",
      color: "from-blue-400 to-cyan-400",
      description:
        "Explore animals in augmented reality for an exciting and immersive learning experience."
    },
    {
      title: "AR Color Book",
      icon: "🎨",
      color: "from-yellow-300 via-orange-400 to-red-400",
      description:
        "Learn colors creatively with interactive AR-based coloring activities."
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-28">

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900">
          Popular{" "}
          <span className="text-yellow-400">
            Courses
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-14">
          Fun and engaging courses designed to spark curiosity and creativity.
        </p>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="
                group relative bg-white rounded-3xl p-8
                shadow-sm hover:shadow-xl
                transition-all duration-300
              "
            >
              {/* Soft Glow */}
              <div
                className={`
                  absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-40
                  transition duration-300
                  blur-lg
                  bg-gradient-to-r ${course.color}
                `}
              />

              {/* Icon */}
              <div
                className={`
                  relative z-10 mb-6
                  w-20 h-20 flex items-center justify-center
                  rounded-2xl text-4xl
                  bg-gradient-to-r ${course.color}
                `}
              >
                {course.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-bold text-gray-800">
                {course.title}
              </h3>

              <p className="relative z-10 mt-2 text-gray-600 text-sm">
                {course.description}
              </p>

              {/* Button */}
              <button
                className="
                  relative z-10 mt-6 w-full
                  bg-gradient-to-r from-yellow-400 to-yellow-300
                  text-black font-bold py-3 rounded-full
                  shadow-[0_6px_0_#d9a400]
                  hover:translate-y-1
                  hover:shadow-[0_3px_0_#d9a400]
                  transition-all
                "
              >
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
