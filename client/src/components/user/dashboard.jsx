import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiRefreshCw,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";

import Card from "@components/order-card/Card";
import RecentOrder from "./recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import { useOrder } from "@context/OrderContext";
import { useAuth } from "@context/AuthContext";

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

  const {
    state: { orders, loading, dashboardCount, error },
    fetchUserDashboardStats,
    fetchOrderCustomer,
  } = useOrder();

  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetchUserDashboardStats(user._id);
      fetchOrderCustomer(user._id, { page: currentPage, limit: 8 });
    }
  }, [currentPage, user]);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const handleLogOut = () => {
    logout();
    Cookies.remove("couponInfo");
    navigate("/");
  };

  const dashboardData = {
    totalDoc: dashboardCount?.totalOrder || 0,
    pending: dashboardCount?.pending || 0,
    processing: dashboardCount?.processing || 0,
    delivered: dashboardCount?.delivered || 0,
  };

  if (isLoading) return <Loading loading={isLoading} />;

  return (
<div className="mx-auto max-w-screen-2xl px-4 sm:px-10 pt-28 pb-10">

      {/* Dashboard Container */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 sm:p-8">

        {!children && (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-2xl font-serif font-semibold text-purple-700">
                 Dashboard Overview
              </h2>

              {/* <button
                onClick={handleLogOut}
                className="
                  mt-4 sm:mt-0
                  px-5 py-2 rounded-full
                  text-sm font-semibold text-red-600
                  hover:bg-red-50 transition-all
                "
              >
                Logout
              </button> */}
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 mb-10 md:grid-cols-2 xl:grid-cols-4">
              <Card
                title="Total Orders"
                Icon={FiShoppingCart}
                quantity={dashboardData.totalDoc}
                className="bg-gradient-to-br from-purple-100 to-purple-50 text-purple-700"
              />
              <Card
                title="Pending Orders"
                Icon={FiRefreshCw}
                quantity={dashboardData.pending}
                className="bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-700"
              />
              <Card
                title="Processing Orders"
                Icon={FiTruck}
                quantity={dashboardData.processing}
                className="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-700"
              />
              <Card
                title="Completed Orders"
                Icon={FiCheck}
                quantity={dashboardData.delivered}
                className="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700"
              />
            </div>

            {/* Recent Orders */}
            <RecentOrder
              data={{ orders }}
              loading={loading}
              error={error}
            />
          </>
        )}

        {children}
      </div>
    </div>
  );
};

export default Dashboard;
