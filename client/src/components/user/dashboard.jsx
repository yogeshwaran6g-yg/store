import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLockOpenOutline } from "react-icons/io5";
import {
  FiCheck,
  FiFileText,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiSettings,
  FiShoppingCart,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

//internal import
// import Layout from "@/components/Layout"; // Removed Layout wrapper
import Card from "@components/order-card/Card";
import RecentOrder from "./recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import { useOrder } from "@context/OrderContext";
import { useAuth } from "@context/AuthContext";

const Dashboard = ({ title, description, children }) => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

  const { state: { orders, loading, dashboardCount, error }, fetchUserDashboardStats, fetchOrderCustomer } = useOrder();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Only fetch if we have a user
    if(user?._id){
       fetchUserDashboardStats(user._id);
       fetchOrderCustomer(user._id, { page: currentPage, limit: 8 });
    }
  }, [currentPage, user, fetchUserDashboardStats, fetchOrderCustomer]);
  
  const handleLogOut = () => {
    logout();
    Cookies.remove("couponInfo");
    navigate("/");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [user, setIsLoading]); 

  const dashboardData = {
      totalDoc: dashboardCount?.totalOrder || 0,
      pending: dashboardCount?.pending || 0,
      processing: dashboardCount?.processing || 0,
      delivered: dashboardCount?.delivered || 0
  };

  const userSidebar = [
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: FiGrid,
    },

    {
      title: "My Orders",
      href: "/user/my-orders",
      icon: FiList,
    },
    {
      title: "My Account",
      href: "/user/my-account",
      icon: FiUser,
    },

    {
      title: "Update Profile",
      href: "/user/update-profile",
      icon: FiSettings,
    },
    {
      title: "Change Password",
      href: "/user/change-password",
      icon: FiFileText,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
            <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
              <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
                {userSidebar?.map((item) => (
                  <span
                    key={item.title}
                    className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                  >
                    <item.icon
                      className="flex-shrink-0 h-4 w-4"
                      aria-hidden="true"
                    />
                    <Link
                      to={item.href}
                      className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600"
                    >
                      {item.title}
                    </Link>
                  </span>
                ))}
                <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  <span className="mr-2">
                    <IoLockOpenOutline />
                  </span>{" "}
                  <button
                    onClick={handleLogOut}
                    className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
            <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
              {!children && (
                <div className="overflow-hidden">
                  <h2 className="text-xl font-serif font-semibold mb-5">
                    Dashboard
                  </h2>
                  <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <Card
                      title="Total Orders"
                      Icon={FiShoppingCart}
                      quantity={dashboardData.totalDoc}
                      className="text-red-600  bg-red-200"
                    />
                    <Card
                      title="Pending Orders"
                      Icon={FiRefreshCw}
                      quantity={dashboardData.pending}
                      className="text-orange-600 bg-orange-200"
                    />
                    <Card
                      title="Processing Orders"
                      Icon={FiTruck}
                      quantity={dashboardData.processing}
                      className="text-indigo-600 bg-indigo-200"
                    />
                    <Card
                      title="Completed Orders"
                      Icon={FiCheck}
                      quantity={dashboardData.delivered}
                      className="text-emerald-600 bg-emerald-200"
                    />
                  </div>
                  <RecentOrder data={{orders: orders}} loading={loading} error={error} />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
