import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartIcon from "@components/cart/CartIcon";

/* PUBLIC MENU */
const MENU_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Programs", id: "programs" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

/* USER MENU (AFTER LOGIN) */
const USER_MENU = [
  { name: "Dashboard", path: "/user/dashboard" },
  { name: "My Orders", path: "/user/my-orders" },
  { name: "My Account", path: "/user/my-account" },
  { name: "Change Password", path: "/user/change-password" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");

  const { cartState } = useCartContext();
  const { user, logout } = useAuth();
  const isCartOpen = cartState.isCartOpen;

  const navigate = useNavigate();
  const location = useLocation();

  /* ACTIVE MENU (PUBLIC ONLY) */
  useEffect(() => {
    if (user) return;

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
  }, [user]);

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

  /* SCROLL HANDLER (PUBLIC) */
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
          : document
              .getElementById(id)
              ?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

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
            onClick={() => navigate("/")}
            className="cursor-pointer font-extrabold text-xl md:text-2xl"
          >
            <span className="text-purple-700">Scholar</span>
            <span>reality</span>
          </div>

          {/* DESKTOP MENU */}
          {!user ? (
            <ul className="hidden md:flex gap-10 font-bold">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className={`relative ${
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
          ) : (
            <ul className="hidden md:flex gap-8 font-bold">
              {USER_MENU.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-purple-700 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* RIGHT SIDE (LOGIN ↔ LOGOUT SAME PLACE) */}
          <div className="flex items-center gap-4">
            <CartIcon />

            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="hidden md:block bg-white px-6 py-2 rounded-full font-bold"
                >
                  Login
                </Link>

                <Link
                  to="/programs"
                  className="
                    hidden md:block
                    bg-gradient-to-r from-purple-600 to-purple-500
                    text-white font-bold
                    px-6 py-2 rounded-full
                    shadow-[0_6px_0_#4c1d95]
                  "
                >
                  Enroll Now
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="
                  hidden md:block
                  bg-white
                  text-red-600
                  font-bold
                  px-6 py-2
                  rounded-full
                  hover:bg-red-50
                  transition-all
                "
              >
                Logout
              </button>
            )}

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

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white rounded-2xl shadow-xl mt-3 p-4"
            >
              {!user ? (
                MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="block w-full text-left py-3 font-bold"
                  >
                    {item.name}
                  </button>
                ))
              ) : (
                <>
                  {USER_MENU.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-bold"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 font-bold text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
