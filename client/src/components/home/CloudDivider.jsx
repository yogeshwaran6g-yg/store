import { useEffect, useState } from "react";

export default function CloudDivider() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-36"
      >
        <path
          d="M0,60 C150,120 350,0 600,60 850,120 1050,40 1200,60 L1200,0 L0,0 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
