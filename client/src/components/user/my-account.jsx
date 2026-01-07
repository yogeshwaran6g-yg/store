import { Link } from "react-router-dom";
import React from "react";
import { FiPlus, FiUser, FiMapPin } from "react-icons/fi";

import Dashboard from "./dashboard";
import { useAuth } from "@context/AuthContext";

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <Dashboard title="My Account" description="User profile and address details">
      <div className="pt-4">

        {/* Page Title */}
        <h2 className="text-2xl font-serif font-semibold text-purple-700 mb-6">
          ✨ My Account
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* ================= USER INFO ================= */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-400 text-white flex items-center justify-center text-xl font-bold">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                user?.name?.charAt(0) || user?.username?.charAt(0)
              )}
            </div>

            <div>
              <h5 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FiUser className="text-purple-600" />
                {user?.name || user?.username}
              </h5>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-600">{user?.phone}</p>
            </div>
          </div>

          {/* ================= ADDRESSES ================= */}
          {user?.addresses?.map((addr, index) => (
            <div
              key={addr._id || index}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6"
            >
              <h5 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <FiMapPin className="text-purple-600" />
                {addr.fullName}
                {addr.isDefault && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Default
                  </span>
                )}
              </h5>

              <p className="text-sm text-gray-600">{addr.phone}</p>
              <p className="text-sm text-gray-600 mt-1">
                {addr.addressLine1}, {addr.city}, {addr.state},{" "}
                {addr.country} - {addr.postalCode}
              </p>
            </div>
          ))}

          {/* ================= ADD NEW ADDRESS ================= */}
          <Link
            to={`/user/add-shipping-address?id=${user?._id}`}
            className="
              rounded-2xl
              border-2 border-dashed border-purple-300
              bg-purple-50/70
              hover:bg-purple-100
              transition-all
              p-6
              flex items-center justify-center gap-3
              text-purple-700 font-semibold
              shadow-sm
            "
          >
            <FiPlus className="text-xl" />
            Add Shipping Address
          </Link>
        </div>
      </div>
    </Dashboard>
  );
};

export default MyAccount;
