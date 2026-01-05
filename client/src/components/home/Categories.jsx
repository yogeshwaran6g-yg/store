import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    {
      title: "Alphabet",
      icon: "🔤",
      color: "from-purple-400 to-indigo-400",
    },
    {
      title: "Numbers",
      icon: "🔢",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Vehicles",
      icon: "🚗",
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Animals",
      icon: "🐶",
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "AR Colors",
      icon: "🎨",
      color: "from-yellow-300 to-orange-400",
    },
    {
      title: "Learning Kit",
      icon: "📦",
      color: "from-red-400 to-pink-400",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-4">
          Learning{" "}
          <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Categories
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-14">
          Explore fun and interactive learning areas designed specially for kids.
        </p>

        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="
                group relative bg-white rounded-3xl p-8
                shadow-sm hover:shadow-xl
                transition-all duration-300
                text-center cursor-pointer
              "
            >
              {/* Soft Glow */}
              <div
                className={`
                  absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-40
                  transition duration-300
                  blur-lg
                  bg-gradient-to-r ${cat.color}
                `}
              />

              {/* Icon */}
              <div
                className={`
                  relative z-10 mx-auto mb-5
                  w-20 h-20 flex items-center justify-center
                  rounded-2xl text-4xl text-white
                  bg-gradient-to-r ${cat.color}
                `}
              >
                {cat.icon}
              </div>

              {/* Text */}
              <h3 className="relative z-10 font-bold text-lg text-gray-800">
                {cat.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm text-gray-600">
                Fun, engaging lessons that spark curiosity and creativity.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
