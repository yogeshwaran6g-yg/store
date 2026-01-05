import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartState } = useCartContext();
  const isCartOpen = cartState.isCartOpen;

  useEffect(() => {
    if (isCartOpen) {
      setVisible(false); // 🔴 hide navbar when cart opens
      return;
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, isCartOpen]);

  // 🔴 Completely hide navbar when cart is open
  if (isCartOpen) return null;

  return (
    <header
      className={`
        fixed left-1/2 -translate-x-1/2 z-40
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-24"}
        ${scrolled ? "top-3 w-[96%]" : "top-0 w-full"}
      `}
    >
      {/* NAVBAR */}
      <nav
        className={`
          flex items-center justify-between
          px-4 py-2 md:px-8 md:py-4
          bg-yellow-100
          transition-all duration-500
          ${
            scrolled
              ? "rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)] md:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              : "rounded-none"
          }
        `}
      >
        {/* LOGO */}
        <div className="text-xl md:text-2xl font-extrabold tracking-wide">
          <span className="text-purple-600">AR</span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            Book
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 font-bold text-black">
          {["Home", "Programs", "About", "Contact"].map((item) => (
            <li key={item} className="hover:text-yellow-500 transition">
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="
            hidden md:block
            bg-yellow-400 text-black font-bold
            px-5 py-2 text-sm md:px-7 md:py-3 md:text-base
            rounded-full
            shadow-[0_6px_0_#c9a200]
            hover:translate-y-[1px]
            hover:shadow-[0_4px_0_#c9a200]
            transition-all
          "
        >
          Enroll Now
        </button>
      </nav>
    </header>
  );
}
