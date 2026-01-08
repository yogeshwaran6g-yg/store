import { NavLink } from "react-router-dom";
import { LayoutDashboard, CreditCard, Box, LogOut, Menu, X, Users, Tag, Moon, Sun } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function SidebarLayout({ children }) {
  const { isSidebarOpen, toggleSidebar, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/orders", label: "Orders", icon: LayoutDashboard },
    { path: "/users", label: "Users", icon: Users },
    { path: "/payment", label: "Payments", icon: CreditCard },
    { path: "/products", label: "Products", icon: Tag },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#1e1e1e] transition-colors">
      {/* Sidebar */}
      <aside
        className={`fixed z-10 h-full w-64 bg-white dark:bg-[#2d2d2d] border-r border-gray-200 dark:border-gray-700
        flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <Box className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Admin</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Close Sidebar"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout – pinned to bottom */}
        <div className="mt-auto p-4 border-t border-gray-100 dark:border-gray-700">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300
          hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"          
          onClick={()=>logout()}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="mb-4 p-2 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Open Sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
