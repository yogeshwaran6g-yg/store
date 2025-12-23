const HeroSection = () => {
  return (
    <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center bg-slate-900 group">

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBkv8t1sDHCWSNIIGigXSk1GdAPbKreJTguBVCgCPHo68LYMa9bga83HWlUOVJUs3jdTdLTe-fbK79e5hSc4D225K4pzha6vxoj7y5YZuM2CFXJizgmn9Yr7KNnUJiryMkTloX0aenAGNlYY7NKW-1CdnGgk1nsOzoZJ3sFZXy8RaCIjA06L_VB9alZo5ei3y80BCaMml6g2A9BStLO-j0FWwGBerX4DyZqyLnVf5iXH55L8l3Xq11ZLKgn4Vgpexvlt5NQbZqp_ah"
              alt="Child playing with colorful educational toys on floor"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-2xl px-6 sm:px-12 lg:px-16 flex flex-col items-start gap-6">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
              New Collection
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Spark Curiosity with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent-green">
                AR-Powered
              </span>{" "}
              Play
            </h2>

            <p className="text-lg text-slate-200 max-w-md font-medium leading-relaxed">
              Engaging educational toys that blend physical play with digital
              learning for ages 2-12.
            </p>

            <div className="flex gap-4 pt-2">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 flex items-center gap-2">
                Shop Now
                
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 transition-all flex items-center gap-2">
                
                Watch Demo
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
