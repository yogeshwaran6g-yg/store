import { NavLink } from "react-router-dom";
import { LayoutDashboard, CreditCard, Box, LogOut, Menu, X } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

export default function SidebarLayout({ children }) {
  const { isSidebarOpen, toggleSidebar } = useAuthContext();

  const navItems = [
    { path: "/orders", label: "Orders", icon: LayoutDashboard },
    { path: "/payment", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-10 h-full w-64 bg-white border-r border-gray-200
        flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <Box className="w-6 h-6 text-indigo-600" />
            <span>Admin</span>
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Close Sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
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
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout – pinned to bottom */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
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
            className="mb-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            title="Open Sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
