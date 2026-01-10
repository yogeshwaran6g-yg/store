import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Tag,
  Users,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Box,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function TopLayout({ children }) {
  const { logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/orders", label: "Orders", icon: ShoppingBag },
    { path: "/users", label: "Users", icon: Users },
    { path: "/payment", label: "Payments", icon: CreditCard },
    { path: "/products", label: "Products", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-white dark:from-[#1f1b2e] dark:via-[#1e1e2e] dark:to-[#1a1a28] transition-colors">

      {/* ================= TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50">
        <div className="bg-purple-100/80 dark:bg-[#2a2540]/80 backdrop-blur-md border-b border-purple-200 dark:border-purple-900/40">
          <div className="max-w-7xl mx-auto px-2 h-16 flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-2 font-bold text-lg text-purple-900 dark:text-purple-200">
              <Box className="w-6 h-6 text-purple-700 dark:text-purple-300" />
              Admin
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? "bg-purple-200 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200"
                      : "text-purple-700 dark:text-purple-300 hover:bg-purple-200/70 dark:hover:bg-purple-800/40"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}

                  {/* SUBTLE ACTIVE LINE */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 bg-purple-500 rounded-full transition-all" />
                </NavLink>
              ))}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">

              {/* THEME TOGGLE */}
              {/* <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-purple-200/70 dark:bg-purple-900/40 hover:bg-purple-300 dark:hover:bg-purple-800 transition"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-purple-700" />
                ) : (
                  <Sun className="w-5 h-5 text-purple-300" />
                )}
              </button> */}

              {/* LOGOUT (DESKTOP) */}
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
                bg-purple-700 text-white text-sm font-medium
                hover:bg-purple-800 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-purple-200 dark:bg-purple-900/40 hover:bg-purple-300 dark:hover:bg-purple-800 transition"
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-purple-100 dark:bg-[#2a2540] border-t border-purple-200 dark:border-purple-900/40 p-4 space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${isActive
                    ? "bg-purple-200 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200"
                    : "text-purple-700 dark:text-purple-300 hover:bg-purple-200/70 dark:hover:bg-purple-800/40"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}

            {/* MOBILE LOGOUT */}
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
              bg-purple-700 text-white font-medium
              hover:bg-purple-800 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
