export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 text-white">
      
      {/* ⬆️ SCROLL TO TOP ICON (RIGHT BOTTOM) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
          absolute
          right-6 bottom-6
          w-14 h-14
          bg-gradient-to-r from-yellow-400 to-yellow-300
          text-purple-800
          rounded-full
          flex items-center justify-center
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          hover:-translate-y-1
          hover:shadow-[0_14px_35px_rgba(0,0,0,0.45)]
          transition-all
        "
      >
        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        {/* LOGO */}
        <h3 className="text-3xl font-extrabold mb-3">
          BrightSteps <span className="text-yellow-400">Kids</span>
        </h3>

        <p className="max-w-md mx-auto text-white/80 mb-8">
          Inspiring young minds through fun, safe, and interactive augmented
          reality learning experiences.
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm font-medium">
          <button className="hover:text-yellow-300 transition">Home</button>
          <button className="hover:text-yellow-300 transition">Programs</button>
          <button className="hover:text-yellow-300 transition">About</button>
          <button className="hover:text-yellow-300 transition">Contact</button>
        </div>

        {/* DIVIDER */}
        <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />

        {/* COPYRIGHT */}
        <p className="text-sm text-yellow-300">
          © {new Date().getFullYear()} BrightSteps Kids. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
