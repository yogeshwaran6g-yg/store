



export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-500 min-h-[120vh]">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ⭐ Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-yellow-200 animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px rgba(255,215,0,0.9)",
              filter: "blur(0.3px)",
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 🌙 Half Moon */}
      <div className="absolute top-20 right-24 w-32 h-32 animate-float z-10">
        <div className="relative w-full h-full rounded-full bg-yellow-200 shadow-[0_0_40px_rgba(255,255,200,0.6)]">
          <div className="absolute top-0 left-6 w-full h-full rounded-full bg-purple-600" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-48 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="max-w-xl text-white text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Discover the Magic of
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,215,0,0.45)]">
              Learning at  Scholarreality
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90 font-medium">
            Welcome to  Scholarreality where each day brings new opportunities for
            <span className="text-yellow-300 font-semibold">
              {" "}discovery and growth
            </span>{" "}
            through augmented reality learning.
          </p>

          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-[0_10px_0_#d9a400] hover:translate-y-1 hover:shadow-[0_6px_0_#d9a400] transition-all">
              Explore Now
            </button>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/30 transition-all">
              <span className="w-9 h-9 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-md">
                ▶
              </span>
              Watch Video
            </button>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="relative mt-20 lg:mt-0 flex items-end">

          {/* 🚀 Rocket */}
          {/* <div className="absolute -top-24 right-10 w-24 animate-float z-20">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M32 2C20 14 20 36 32 50C44 36 44 14 32 2Z" fill="#ffffff"/>
              <circle cx="32" cy="26" r="6" fill="#60A5FA"/>
              <path d="M20 42L10 54L24 48L20 42Z" fill="#EF4444"/>
              <path d="M44 42L40 48L54 54L44 42Z" fill="#EF4444"/>
              <path d="M32 50L28 60H36L32 50Z" fill="#F59E0B"/>
            </svg>
          </div> */}

          {/* Ground shadow */}
          <div className="absolute bottom-10 right-24 w-64 h-10 bg-black/30 blur-2xl rounded-full z-20" />

          {/* 👦 Kid Image (BIG & FULL BODY) */}
          <img
            src="/images/kids-1.png"
            alt="Kid Learning"
            className="
              w-64 sm:w-72 lg:w-[420px]
              relative
              -bottom-33
              z-30
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]
            "
          />
        </div>
      </div>
      {/* ☁️ Cloud Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 240"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-56 md:h-72"
        >
          {/* Fill */}
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

          {/* Outline */}
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
