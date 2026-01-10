import { useEffect } from "react";
import { IoBagHandle } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useOrder } from "@components/context/OrderContext";
import { useSideBar } from "../context/SidebarContext";

import Dashboard from "./dashboard";
import Loading from "@components/preloader/Loading";
import OrderHistory from "@components/order/OrderHistory";
import CMSkeletonTwo from "@components/preloader/CMSkeletonTwo";

const MyOrders = () => {
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useSideBar();

  const {
    state: { orders, loading, error, totalDoc },
  } = useOrder();

  const pageCount = Math.ceil((totalDoc || 0) / 10);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <Dashboard title="My Orders" description="User order history">
      <div className="pt-4">
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-4 sm:p-6">

          {/* Header */}
          <h2 className="text-2xl font-serif font-semibold mb-6 text-purple-700">
            ✨ My Orders
          </h2>

          {/* LOADING */}
          {loading ? (
            <CMSkeletonTwo count={6} width={100} error={error} loading={loading} />
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <IoBagHandle className="mx-auto text-6xl text-purple-400 mb-4" />
              <p className="text-gray-600 font-medium">
                You have no orders yet
              </p>
            </div>
          ) : (
            <>
              {/* ================= MOBILE CARD VIEW ================= */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => {
                  const orderId =
                    order.invoice ||
                    order._id?.slice(-8).toUpperCase();

                  return (
                    <div
                      key={order._id}
                      className="rounded-xl border border-purple-200 bg-white p-4 shadow-sm"
                    >
                      {/* Top */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-purple-700">
                          #{orderId}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          {order.status}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date</span>
                          <span>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment</span>
                          <span className="capitalize">
                            {order.paymentMethod}
                          </span>
                        </div>

                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="tabular-nums">
                            ${Number(
                              order.totalAmount ??
                                order.totalPrice ??
                                order.total ??
                                0
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <Link
                        to={`/user/order/${order._id}`}
                        className="mt-4 block w-full text-center rounded-lg bg-purple-600 text-white py-2 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* ================= DESKTOP TABLE VIEW ================= */}
              <div className="hidden md:block overflow-x-auto mt-6">
                <div className="w-full rounded-xl overflow-hidden border border-purple-100">
                  <table className="w-full table-fixed divide-y divide-purple-100">
                    <thead className="bg-gradient-to-r from-purple-100 to-purple-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-left w-[140px]">
                          ID
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center">
                          Order Time
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center">
                          Method
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-right w-[140px]">
                          Total
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center w-[120px]">
                          Details
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-purple-50">
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-purple-50/60 transition-all"
                        >
                          <OrderHistory order={order} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Pagination */}
          {totalDoc > 10 && (
            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next →"
                previousLabel="← Prev"
                onPageChange={(e) => handleChangePage(e.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                containerClassName="flex items-center gap-2 text-sm"
                pageClassName="px-3 py-1 rounded-md border border-purple-200 text-purple-700 hover:bg-purple-100"
                activeClassName="bg-purple-600 text-white border-purple-600"
                previousClassName="px-3 py-1 rounded-md border border-purple-200 text-purple-700 hover:bg-purple-100"
                nextClassName="px-3 py-1 rounded-md border border-purple-200 text-purple-700 hover:bg-purple-100"
                breakClassName="px-3 py-1 text-purple-400"
              />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default MyOrders;
