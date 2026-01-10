import { useNavigate } from "react-router-dom";
import { useOrdersList } from "@services/orderService";
import { useUsersList } from "@services/userService";
import { usePaymentsList } from "@services/paymentService";
import {
  Users,
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  ShieldAlert,
  CreditCard,
  UserCheck,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Users
  const { data: allUsers } = useUsersList({ page: 1, limit: 1 });
  const { data: activeUsers } = useUsersList({
    page: 1,
    limit: 1,
    status: "active",
  });
  const { data: adminUsers } = useUsersList({
    page: 1,
    limit: 1,
    role: "admin",
  });

  // Orders
  const { data: allOrders } = useOrdersList({ page: 1, limit: 1 });
  const { data: completedOrders } = useOrdersList({
    page: 1,
    limit: 1,
    status: "DELIVERED",
  });
  const { data: pendingOrders } = useOrdersList({
    page: 1,
    limit: 1,
    status: "PENDING",
  });
  const { data: cancelledOrders } = useOrdersList({
    page: 1,
    limit: 1,
    status: "CANCELLED",
  });

  // Payments
  const { data: successPayments } = usePaymentsList({
    page: 1,
    limit: 1,
    status: "SUCCESS",
  });
  const { data: failedPayments } = usePaymentsList({
    page: 1,
    limit: 1,
    status: "FAILED",
  });

  // Today's Orders
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data: todayOrders } = useOrdersList({
    page: 1,
    limit: 1,
    startDate: todayStart.toISOString(),
    endDate: todayEnd.toISOString(),
  });

  const getCount = (data) =>
    data?.pagination?.totalDocs || data?.pagination?.total || 0;

  const stats = [
    // USERS
    {
      title: "Total Users",
      count: getCount(allUsers),
      icon: Users,
      path: "/users",
    },
    {
      title: "Active Users",
      count: getCount(activeUsers),
      icon: UserCheck,
      path: "/users",
    },
    // {
    //   title: "Admins",
    //   count: getCount(adminUsers),
    //   icon: ShieldAlert,
    //   path: "/users",
    // },

    // ORDERS
    {
      title: "Total Orders",
      count: getCount(allOrders),
      icon: ShoppingBag,
      path: "/orders",
    },
    {
      title: "Today's Orders",
      count: getCount(todayOrders),
      icon: ShoppingBag,
      path: "/orders",
    },
    {
      title: "Completed Orders",
      count: getCount(completedOrders),
      icon: CheckCircle,
      path: "/orders",
    },
    {
      title: "Pending Orders",
      count: getCount(pendingOrders),
      icon: Clock,
      path: "/orders",
    },
    {
      title: "Cancelled Orders",
      count: getCount(cancelledOrders),
      icon: XCircle,
      path: "/orders",
    },

    // PAYMENTS
    {
      title: "Successful Payments",
      count: getCount(successPayments),
      icon: CreditCard,
      path: "/payment",
    },
    {
      title: "Failed Payments",
      count: getCount(failedPayments),
      icon: XCircle,
      path: "/payment",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-200">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            className="
              relative overflow-hidden
              p-6 rounded-2xl
              bg-white/60 dark:bg-purple-900/20
              backdrop-blur-xl
              border border-purple-200/50 dark:border-purple-800/40
              shadow-sm
              cursor-pointer
              transition-all
              hover:-translate-y-1 hover:shadow-md
              active:scale-[0.98]
            "
          >
            {/* CONTENT */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-purple-900 dark:text-white mt-1">
                  {stat.count}
                </h3>
              </div>

              <div
                className="
                  p-3 rounded-xl
                  bg-purple-600/10
                  text-purple-700
                  dark:bg-purple-500/20 dark:text-purple-300
                "
              >
                <stat.icon className="w-7 h-7" />
              </div>
            </div>

            {/* GLASS DECORATION */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
