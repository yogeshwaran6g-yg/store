import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";

// internal imports
import Dashboard from "./dashboard";
import useGetSetting from "@/hooks/useGetSetting";
import OrderServices from "@/services/OrderServices";
import Loading from "@/components/preloader/Loading";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import OrderHistory from "@/components/order/OrderHistory";
import { SidebarContext } from "@/context/SidebarContext";
import CMSkeletonTwo from "@/components/preloader/CMSkeletonTwo";

const MyOrders = () => {
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useContext(SidebarContext);

  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () =>
      OrderServices.getOrderCustomer({
        limit: 10,
        page: currentPage,
      }),
    keepPreviousData: true,
  });

  const pageCount = Math.ceil((data?.totalDoc || 0) / 10);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  return (
    <Dashboard
      title={showingTranslateValue(
        storeCustomizationSetting?.dashboard?.my_order
      )}
      description="This is user order history page"
    >
      <div className="overflow-hidden rounded-md font-serif">
        <h2 className="text-xl font-semibold mb-5">My Orders</h2>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full border rounded-md">
            {loading ? (
              <CMSkeletonTwo
                count={20}
                width={100}
                error={error}
                loading={loading}
              />
            ) : data?.orders?.length === 0 ? (
              <div className="text-center py-20">
                <IoBagHandle className="mx-auto text-emerald-500 text-6xl" />
                <h2 className="mt-4 text-gray-600 font-medium">
                  You have no orders yet
                </h2>
              </div>
            ) : (
              <>
                <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-2 text-left text-xs font-semibold">
                        ID
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold">
                        Order Time
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold">
                        Method
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold">
                        Total
                      </th>
                      <th className="px-6 py-2 text-right text-xs font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y">
                    {data.orders.map((order) => (
                      <tr key={order._id}>
                        <OrderHistory order={order} />
                        <td className="px-5 py-3 text-right">
                          <Link
                            to={`/order/${order._id}`}
                            className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-full transition"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {data.totalDoc > 10 && (
                  <div className="paginationOrder mt-6">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next"
                      previousLabel="Previous"
                      onPageChange={(e) =>
                        handleChangePage(e.selected + 1)
                      }
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      forcePage={currentPage - 1}
                      containerClassName="pagination"
                      pageClassName="page--item"
                      pageLinkClassName="page--link"
                      activeClassName="activePagination"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default MyOrders;
