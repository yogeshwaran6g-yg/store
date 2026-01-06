



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
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-40 pb-48 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="max-w-xl text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Discover the Magic of
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,215,0,0.45)]">
              Learning at AR Book
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90 font-medium">
            Welcome to AR Book where each day brings new opportunities for
            <span className="text-yellow-300 font-semibold">
              {" "}discovery and growth
            </span>{" "}
            through augmented reality learning.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-[0_10px_0_#d9a400] hover:translate-y-1 hover:shadow-[0_6px_0_#d9a400] transition-all">
              Explore Now
            </button>

            <button className="flex items-center gap-3 px-7 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/30 transition-all">
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
              w-72 lg:w-[420px]
              relative
              -bottom-12
              z-30
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]
            "
          />
        </div>
      </div>

      {/* ☁️ Cloud Divider (PUSHED DOWN) */}
        {/* Cloud Divider */}
      <div className="absolute left-0 w-full overflow-hidden leading-none" style={{ bottom: "-60px" }}>
             <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          
          {/* CLOUD FILL */}
          <path
            d="
              M0,130
              C25,100 50,90 75,100
              C100,110 125,150 150,145
              C175,140 195,110 220,105
              C245,100 270,115 295,130
              C320,145 345,175 370,170
              C395,165 415,135 440,125
              C465,115 490,135 515,150
              C540,165 565,195 590,190
              C615,185 635,150 660,140
              C685,130 710,150 735,165
              C760,180 785,210 810,205
              C835,200 855,170 880,160
              C905,150 930,170 955,185
              C980,200 1005,230 1030,225
              C1055,220 1075,190 1100,180
              C1125,170 1150,185 1175,200
              C1200,215 1225,245 1250,235
              C1275,225 1300,205 1325,195
              C1350,185 1380,180 1440,185
              L1440,320
              L0,320
              Z
            "
            fill="white"
          />

          {/* TOP OUTLINE */}
          <path
            d="
              M0,130
              C25,100 50,90 75,100
              C100,110 125,150 150,145
              C175,140 195,110 220,105
              C245,100 270,115 295,130
              C320,145 345,175 370,170
              C395,165 415,135 440,125
              C465,115 490,135 515,150
              C540,165 565,195 590,190
              C615,185 635,150 660,140
              C685,130 710,150 735,165
              C760,180 785,210 810,205
              C835,200 855,170 880,160
              C905,150 930,170 955,185
              C980,200 1005,230 1030,225
              C1055,220 1075,190 1100,180
              C1125,170 1150,185 1175,200
              C1200,215 1225,245 1250,235
              C1275,225 1300,205 1325,195
              C1350,185 1380,180 1440,185
            "
            fill="none"
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </section>
  );
}
