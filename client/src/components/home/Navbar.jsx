import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartIcon from "@components/cart/CartIcon";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartState } = useCartContext();
  const isCartOpen = cartState.isCartOpen;

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

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
         bg-gradient-to-r from-yellow-400 to-yellow-300
          transition-all duration-500
          ${scrolled
            ? "rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)] md:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            : "rounded-none"
          }
        `}
      >
        {/* LOGO */}
        <div
          onClick={() => handleScroll("home")}
          className="text-xl md:text-2xl font-extrabold tracking-wide cursor-pointer"
        >
          <span className="text-purple-600">Scholar</span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white bg-clip-text ">
            reality
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 font-bold text-black">
          {[
            { name: "Home", id: "home" },
            { name: "Programs", id: "programs" },
            { name: "About", id: "about" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <li
              key={item.name}
              onClick={() => handleScroll(item.id)}
              className="hover:text-yellow-500 transition cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 md:gap-4">

          <CartIcon />

          {/* LOGIN BUTTON */}
          <Link
            to="/auth/login"
            className="
             hidden md:block
              bg-white text-black font-bold
              px-5 py-2 text-sm md:px-7 md:py-3 md:text-base
              rounded-full
              border-2 border-yellow-400
              hover:bg-yellow-50
              transition-all
            "
          >
            Login
          </Link>

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
        </div>
      </nav>
    </header>
  );
}
