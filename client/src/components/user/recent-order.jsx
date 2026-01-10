import React, { useContext } from "react";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { SidebarContext } from "@context/SidebarContext";

// internal imports
import OrderHistory from "@components/order/OrderHistory";
import OrderHistorySkeleton from "@components/preloader/OrderHistorySkeleton";

const RecentOrder = ({ data, loading, error }) => {
  const { handleChangePage, currentPage } = useContext(SidebarContext);
  const pageCount = Math.ceil((data?.totalDoc || 0) / 10);

  return (
<div className="mx-auto md:max-w-screen-2xl md:px-4">
      <div className="rounded-2xl font-serif bg-white/70 backdrop-blur-xl shadow-xl border border-purple-200">
        <div className="flex flex-col p-6">

          {/* Header */}
          <h3 className="text-xl font-semibold mb-6 text-purple-700">
            Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <div className="min-w-full rounded-xl border border-purple-100 bg-white/60">
              <div className="overflow-hidden rounded-xl">

                {/* ================= LOADING ================= */}
                {loading ? (
                  <OrderHistorySkeleton rows={5} />

                ) : data?.orders?.length === 0 ? (
                  <div className="text-center py-20">
                    <IoBagHandle className="mx-auto text-6xl text-purple-400 mb-4" />
                    <p className="text-gray-600 font-medium">
                      You have no orders yet
                    </p>
                  </div>
                ) : (
                  <>
                    {/* ================= MOBILE CARD VIEW ================= */}
{/* ================= MOBILE CARD VIEW (SEPARATE BOXES) ================= */}
<div className="md:hidden py-4 space-y-6">
  {data.orders.map((order) => (
    <div
      key={order._id}
      className="
        mx-4
        rounded-2xl
        bg-white
        border border-purple-200
        shadow-sm
        px-5 py-6
      "
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-purple-700">
          Order #{order.invoice}
        </span>

        <span
          className={`inline-flex items-center gap-2 px-1 py-1 rounded-full text-[10px] font-semibold
            ${
              order.status === "Delivered"
                ? "bg-emerald-100 text-emerald-700"
                : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-indigo-100 text-indigo-700"
            }
          `}
        >
          <span
            className={`w-2 h-2 rounded-full
              ${
                order.status === "Delivered"
                  ? "bg-emerald-600"
                  : order.status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-indigo-600"
              }
            `}
          />
          {order.status}
        </span>
      </div>

      {/* ===== Info ===== */}
      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <span className="text-gray-500">Order Date</span>
        <span className="text-right text-gray-700">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>

        <span className="text-gray-500">Payment</span>
        <span className="text-right text-gray-700 capitalize">
          {order.paymentMethod}
        </span>

        <span className="text-gray-500">Total</span>
        <span className="text-right font-semibold text-purple-700">
          ₹{Number(
            order.totalAmount ??
            order.totalPrice ??
            order.total ??
            0
          ).toLocaleString()}
        </span>
      </div>

      {/* ===== Action ===== */}
      <Link
        to={`/order/${order._id}`}
        className="
          mt-5 block w-full
          text-center rounded-full
          bg-purple-600 text-white
          py-1 text-[12px] font-semibold
          shadow-sm
          active:scale-95
          transition
        "
      >
        Details
      </Link>
    </div>
  ))}
</div>



                    {/* ================= DESKTOP TABLE VIEW ================= */}
                    <div className="hidden md:block">
                      <table className="min-w-full table-fixed divide-y divide-purple-100">
                        <thead className="bg-gradient-to-r from-purple-100 to-purple-50">
                          <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-left w-[16%]">
                              ID
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center w-[18%]">
                              Order Time
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center w-[18%]">
                              Method
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center w-[18%]">
                              Status
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-right w-[15%]">
                              Total
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center w-[10%]">
                              Details
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-purple-50">
                          {data.orders.map((order) => (
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
                  </>
                )}

                {/* ================= PAGINATION ================= */}
                {data?.totalDoc > 10 && (
                  <div className="flex justify-center py-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrder;
