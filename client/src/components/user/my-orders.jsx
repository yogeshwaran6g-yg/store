import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { useOrder } from "@components/context/OrderContext";

import Dashboard from "./dashboard";
import Loading from "@components/preloader/Loading";
import OrderHistory from "@components/order/OrderHistory";
import { useSideBar } from "../context/SidebarContext";
import OrderHistorySkeleton from "@components/preloader/OrderHistorySkeleton";

const MyOrders = () => {
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useSideBar();

  const {
    state: { orders, loading, error, totalDoc },
  } = useOrder();

  const data = {
    orders,
    totalDoc: totalDoc || 0,
  };

  const pageCount = Math.ceil(data.totalDoc / 10);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <Dashboard title="My Orders" description="User order history">
      <div className="pt-4">

        {/* Card */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6">

          {/* Header */}
          <h2 className="text-2xl font-serif font-semibold mb-6 text-purple-700 flex items-center gap-2">
             My Orders
          </h2>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-full rounded-xl overflow-hidden border border-purple-100">

              {loading ? (
                <OrderHistorySkeleton rows={10} />
              ) : data.orders.length === 0 ? (
                <div className="text-center py-20">
                  <IoBagHandle className="mx-auto text-6xl text-purple-400 mb-4" />
                  <p className="text-gray-600 font-medium">
                    You have no orders yet
                  </p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-purple-100">
                  {/* Table Head */}
                  <thead className="bg-gradient-to-r from-purple-100 to-purple-50">
                    <tr>
                      {[
                        "ID",
                        "Order Time",
                        "Method",
                        "Status",
                        "Total",
                        "Action",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-6 py-3 text-xs font-semibold text-purple-700 uppercase text-center"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
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
              )}
            </div>
          </div>

          {/* Pagination */}
          {data.totalDoc > 10 && (
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
