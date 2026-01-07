import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineViewInAr } from "react-icons/md";
import { GiSatelliteCommunication } from "react-icons/gi";

export default function Hero() {
  const parallaxRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* 📱 Detect mobile */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  /* 🌌 PARALLAX EFFECT */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-500 min-h-[120vh]">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ⭐ STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(isMobile ? 20 : 50)].map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 🌠 SHOOTING STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="shooting-star"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10 + 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* 🧩 FLOATING ICONS */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none z-10">
        <MdOutlineViewInAr className="absolute top-32 left-16 text-yellow-400 text-4xl animate-float drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]" />
        <FaStar className="absolute bottom-40 right-24 text-yellow-300 text-2xl animate-float" />
      </div>

      {/* 🛰 SATELLITE */}
      <div className="absolute top-28 right-1/4 animate-orbit z-10">
        <GiSatelliteCommunication className="text-white text-3xl drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>

      {/* 🌙 HALF MOON */}
      <div className="absolute top-20 right-24 w-32 h-32 animate-float z-10">
        <div className="relative w-full h-full rounded-full bg-yellow-200 shadow-[0_0_40px_rgba(255,255,200,0.6)]">
          <div className="absolute top-0 left-6 w-full h-full rounded-full bg-purple-600" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-32 sm:pb-48 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="max-w-xl text-white text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Discover the Magic of
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Learning at Scholarreality
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90 font-medium">
            Welcome to Scholarreality where each day brings new opportunities for
            <span className="text-yellow-300 font-semibold"> discovery and growth</span>{" "}
            through augmented reality learning.
          </p>

          {/* ✅ BUTTONS (RESTORED) */}
          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">

            {/* Explore */}
            <button className="w-full sm:w-auto bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-[0_10px_0_#d9a400] hover:translate-y-1 hover:shadow-[0_6px_0_#d9a400] transition-all">
              Explore Now
            </button>

            {/* Watch Video (OLD STYLE) */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/30 transition-all">
              <span className="w-9 h-9 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-md">
                ▶
              </span>
              Watch Video
            </button>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative mt-20 lg:mt-0">

          {/* 🎥 AR Glow */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-72 h-72 lg:w-[420px] lg:h-[420px] rounded-full bg-yellow-400/20 blur-3xl animate-pulse-slow" />
          </div>

          {/* Ground Shadow */}
          <div className="absolute bottom-10 right-24 w-64 h-10 bg-black/30 blur-2xl rounded-full z-20" />

          {/* Kid Image */}
          <img
            src="/images/kids-1.png"
            alt="Kid Learning"
            className="w-72 lg:w-[420px] relative -bottom-28 sm:-bottom-36 z-30 drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* ☁️ Cloud Wave Divider WITH OUTLINE */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="w-full h-32 sm:h-56 md:h-72"
        >
          <path
            d="
              M0,140
              C35,185 75,95 115,130
              C155,165 195,205 235,170
              C275,140 315,90 355,120
              C395,150 435,195 475,165
              C515,135 555,85 595,115
              C635,145 675,190 715,160
              C755,135 795,95 835,120
              C875,145 915,185 955,160
              C995,135 1035,90 1075,115
              C1115,140 1155,180 1195,155
              C1235,130 1275,95 1315,120
              C1355,145 1395,185 1440,150
              L1440,240
              L0,240
              Z
            "
            fill="#FFFFFF"
          />
          <path
            d="
              M0,140
              C35,185 75,95 115,130
              C155,165 195,205 235,170
              C275,140 315,90 355,120
              C395,150 435,195 475,165
              C515,135 555,85 595,115
              C635,145 675,190 715,160
              C755,135 795,95 835,120
              C875,145 915,185 955,160
              C995,135 1035,90 1075,115
              C1115,140 1155,180 1195,155
              C1235,130 1275,95 1315,120
              C1355,145 1395,185 1440,150
            "
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </section>
  );
}
