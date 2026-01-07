export default function Features() {
  const features = [
    {
      title: "Interactive Learning",
      icon: "🎮",
      color: "from-purple-400 to-indigo-400",
      desc: "Kids learn by playing, exploring, and interacting with AR content.",
    },
    {
      title: "Skill Development",
      icon: "🧠",
      color: "from-yellow-300 to-orange-400",
      desc: "Build creativity, problem-solving, and thinking skills naturally.",
    },
    {
      title: "Safe Environment",
      icon: "🛡️",
      color: "from-green-300 to-emerald-400",
      desc: "A secure and child-friendly space designed for young learners.",
    },
    {
      title: "AR Adventures",
      icon: "🚀",
      color: "from-blue-300 to-cyan-400",
      desc: "Travel through space, science, and stories with AR magic.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900">
          Why Choose{" "}
          <span className="text-yellow-400">
            AR Book
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-14">
          A fun, safe, and immersive way for children to learn using
          augmented reality.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                group relative bg-white rounded-3xl p-8 text-center
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* Soft Glow */}
              <div
                className={`
                  absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-40
                  transition duration-300
                  blur-lg
                  bg-gradient-to-r ${item.color}
                `}
              />

              {/* Icon */}
              <div
                className={`
                  relative z-10 mx-auto w-16 h-16
                  flex items-center justify-center rounded-2xl
                  text-3xl bg-gradient-to-r ${item.color}
                `}
              >
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="relative z-10 mt-6 text-lg font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
