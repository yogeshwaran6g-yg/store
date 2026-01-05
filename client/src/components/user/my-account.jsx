import { Link } from "react-router-dom";
import React from "react";
import { FiPlus } from "react-icons/fi";

//internal imports
import Dashboard from "./dashboard";
import { useAuth } from "@context/AuthContext";

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <Dashboard title="my-account" description="This is my account page">
      <div className="overflow-hidden">
        <div className="grid gap-4 mb-8 sm:grid-cols-2 grid-cols-1">
          {/* User Info Card */}
          <div className="flex h-full relative">
            <div className="flex items-center border border-gray-200 w-full rounded-lg p-4 relative">
              {/* <Link
                to="/user/update-profile"
                className="absolute top-2 right-2 bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-700"
              >
                Edit
              </Link> */}
              <div className="flex items-center justify-center rounded-full text-xl text-center mr-4 bg-gray-200">
                {user?.image ? (
                  <img
                    src={user.image}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full bg-gray-50"
                    alt={user?.name?.[0]}
                  />
                ) : (
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-xl font-bold text-center mr-4">
                    {user?.name?.charAt(0) || user?.username?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h5 className="leading-none mb-2 text-base font-medium text-gray-700">
                  {user?.name || user?.username}
                </h5>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-sm text-gray-500">{user?.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address Cards */}
          {user?.addresses?.map((addr, index) => (
            <div key={addr._id || index} className="flex h-full relative">
              <div className="flex items-center border border-gray-200 w-full rounded-lg p-4 relative">
                <div className="flex-grow">
                  <h5 className="leading-none mb-2 text-base font-medium text-gray-700">
                    {addr.fullName}{" "}
                    {addr.isDefault && (
                      <span className="text-xs text-gray-500">
                        (Default)
                      </span>
                    )}
                  </h5>
                  <p className="text-sm text-gray-500">{addr.phone} </p>
                  <p className="text-sm text-gray-500">
                    {addr.addressLine1}, {addr.city}, {addr.state}, {addr.country} {addr.postalCode}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Address Card */}
          <div className="flex h-full relative">
            <Link
              to={`/user/add-shipping-address?id=${user?._id}`}
              className="flex items-center bg-cyan-600 text-white hover:bg-cyan-700 w-full rounded-lg py-3 px-4 text-center relative"
            >
              <FiPlus className="text-xl font-bold text-center mr-4" /> Add
              Shipping Address
            </Link>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default MyAccount;
