import React, { useContext } from "react";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { SidebarContext } from "@context/SidebarContext";

// internal imports
import OrderHistory from "@components/order/OrderHistory";
import CMSkeletonTwo from "@components/preloader/CMSkeletonTwo";

const RecentOrder = ({ data, loading, error }) => {
  const { handleChangePage, currentPage } = useContext(SidebarContext);
  const pageCount = Math.ceil((data?.totalDoc || 0) / 10);

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="rounded-2xl font-serif bg-white/70 backdrop-blur-xl shadow-xl border border-purple-200">
        <div className="flex flex-col p-6">

          {/* Header */}
          <h3 className="text-xl font-semibold mb-6 text-purple-700 flex items-center gap-2">
            ✨ Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <div className="min-w-full rounded-xl border border-purple-100 bg-white/60">
              <div className="overflow-hidden rounded-xl">

                {loading ? (
                  <CMSkeletonTwo count={10} width={100} error={error} />
                ) : data?.orders?.length === 0 ? (
                  <div className="text-center py-20">
                    <IoBagHandle className="mx-auto text-6xl text-purple-400 mb-4" />
                    <p className="text-gray-600 font-medium">
                      You have no orders yet
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full table-fixed divide-y divide-purple-100">

                    {/* ===== TABLE HEADER ===== */}
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

                      </tr>
                    </thead>

                    {/* ===== TABLE BODY ===== */}
                    <tbody className="bg-white divide-y divide-purple-50">
                      {data.orders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-purple-50/60 transition-all"
                        >
                          <OrderHistory order={order} />

                          {/* ACTION */}

                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* PAGINATION */}
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
