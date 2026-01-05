export default function HeroBackground({ children }) {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      {/* Hero content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Cloud divider */}
      <img
        src="/images/hero-cloud.png"
        alt="Cloud Divider"
        className="absolute bottom-0 left-0 w-full pointer-events-none"
      />
    </section>
  );
}
