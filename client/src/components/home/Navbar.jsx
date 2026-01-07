import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../context/CartContext";
import CartIcon from "@components/cart/CartIcon";

/* MENU ITEMS */
const MENU_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Programs", id: "programs" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");

  const { cartState } = useCartContext();
  const isCartOpen = cartState.isCartOpen;

  const navigate = useNavigate();
  const location = useLocation();

  /* ACTIVE MENU */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );

    MENU_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* SCROLL SHOW / HIDE */
  useEffect(() => {
    if (isCartOpen) {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y < 10) setVisible(true);
      else if (y < lastScrollY) setVisible(false);
      else setVisible(true);

      setLastScrollY(y);
      setOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, isCartOpen]);

  /* SCROLL HANDLER */
  const handleScroll = useCallback(
    (id) => {
      setOpen(false);

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        id === "home"
          ? window.scrollTo({ top: 0, behavior: "smooth" })
          : document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  if (isCartOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={`
          fixed left-1/2 -translate-x-1/2 z-40
          transition-all duration-500
          ${visible ? "translate-y-0" : "-translate-y-24"}
          ${scrolled ? "top-3 w-[96%]" : "top-0 w-full"}
        `}
      >
        {/* NAVBAR */}
        <nav
          className={`
            flex items-center justify-between
            px-4 py-2 md:px-8 md:py-4
            bg-gradient-to-r from-yellow-400 to-yellow-300 text-black
            transition-all duration-500
            ${scrolled
              ? "rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
              : "rounded-none"}
          `}
        >
          {/* LOGO */}
          <div
            onClick={() => handleScroll("home")}
            className="cursor-pointer font-extrabold text-xl md:text-2xl"
          >
            <span className="text-purple-700">Scholar</span>
            <span className="text-black">reality</span>
          </div>

          {/* DESKTOP MENU (UNCHANGED) */}
          <ul className="hidden md:flex gap-10 font-bold">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScroll(item.id)}
                  className={`relative transition ${
                    active === item.id ? "text-purple-700" : ""
                  }`}
                >
                  {item.name}
                  {active === item.id && (
                    <motion.span
                      layoutId="activeLine"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-purple-600 rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            <CartIcon />

            {/* LOGIN */}
            <Link
              to="/auth/login"
              className="hidden md:block bg-white text-black font-bold px-6 py-2 rounded-full"
            >
              Login
            </Link>

            {/* ENROLL */}
            <button
              className="
                hidden md:block
                bg-gradient-to-r from-purple-600 to-purple-500
                text-white font-bold
                px-6 py-2
                rounded-full
                shadow-[0_6px_0_#4c1d95]
                hover:translate-y-[1px]
                hover:shadow-[0_4px_0_#4c1d95]
                transition-all
              "
            >
              Enroll Now
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 flex flex-col justify-between"
            >
              <span className="h-1 bg-black rounded" />
              <span className="h-1 bg-black rounded" />
              <span className="h-1 bg-black rounded" />
            </button>
          </div>
        </nav>

        {/* ✅ MOBILE MENU (NEW – DESKTOP UNAFFECTED) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="
                md:hidden
                absolute top-full left-1/2 -translate-x-1/2
                mt-3 w-[92%]
                bg-white rounded-2xl
                shadow-xl
                overflow-hidden
              "
            >
              <ul className="flex flex-col divide-y font-bold text-gray-800">
                {MENU_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScroll(item.id)}
                      className="w-full text-left px-6 py-4 hover:bg-purple-50"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="p-4 flex flex-col gap-3">
                <Link
                  to="/auth/login"
                  onClick={() => setOpen(false)}
                  className="text-center bg-gray-100 py-3 rounded-full font-bold"
                >
                  Login
                </Link>

                <button
                  className="
                    bg-gradient-to-r from-purple-600 to-purple-500
                    text-white font-bold
                    py-3 rounded-full
                    shadow-[0_6px_0_#4c1d95]
                    active:translate-y-[1px]
                    active:shadow-[0_4px_0_#4c1d95]
                    transition-all
                  "
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
