export default function NewFooter() {
  return (
    <footer className="relative bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 text-white">

      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C120,80 240,0 360,30 480,60 600,100 720,80 840,60 960,20 1080,30 1200,40 1320,60 1440,40 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

        {/* Logo / Name */}
        <h3 className="text-3xl font-extrabold mb-3">
          BrightSteps{" "}
          <span className="text-yellow-400">Kids</span>
        </h3>

        <p className="max-w-md mx-auto text-white/80 mb-8">
          Inspiring young minds through fun, safe, and interactive
          augmented reality learning experiences.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm font-medium">
          <a href="#" className="hover:text-yellow-300 transition">
            Home
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Courses
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            About
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />

        {/* Copyright */}
       <p className="text-sm text-yellow-300">
  © {new Date().getFullYear()} BrightSteps Kids. All rights reserved.
</p>

      </div>
    </footer>
  );
}
