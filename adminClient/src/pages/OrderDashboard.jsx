import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "@columns/OrderColumns";
import DataTable from "@/components/DataTable";
import { useOrdersList } from "@services/orderService";
import { Search } from "lucide-react";

import EditOrderModal from "@components/modal/EditOrderModal";
import OrderItemsModal from "@components/modal/OrderItemsModal";

export default function Orders() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Input state (what user types)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter state (what is sent to API)
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: ""
  });

  const limit = 7;

  // Validation: End date must be after or equal to start date
  const isInvalidDate = startDate && endDate && new Date(startDate) > new Date(endDate);

  const handleSearch = () => {
    if (startDate && endDate && !isInvalidDate) {
      setFilters({
        startDate,
        endDate
      });
      setPage(1); // Reset to first page on new filter
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setFilters({ startDate: "", endDate: "" });
    setPage(1);
  };

  const { data, isLoading } = useOrdersList({
    page,
    limit,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  if (isLoading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading orders...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Orders</h1>

        <div className="w-full sm:w-auto space-y-1">

  {/* SEARCH BAR CONTAINER */}
  <div
    className={`
      flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0
      p-[2px] rounded-2xl
      bg-gradient-to-r from-purple-600 via-purple-500 to-amber-400
      shadow-lg
      transition-all
      ${isInvalidDate ? "animate-pulse" : ""}
    `}
  >
    {/* INNER BAR */}
    <div
      className={`
        flex flex-col sm:flex-row items-stretch sm:items-center gap-2
        bg-white dark:bg-[#2d2d2d]
        rounded-2xl px-3 py-2 sm:py-1.5
        w-full
        ${isInvalidDate ? "ring-2 ring-red-400" : ""}
      `}
    >
      {/* START DATE */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="
          w-full sm:w-auto
          text-sm
          bg-transparent
          text-gray-700 dark:text-gray-200
          outline-none
          focus:ring-0
          px-2 py-1
        "
      />

      {/* DASH */}
      <span className="hidden sm:block text-gray-400 px-1">—</span>

      {/* END DATE */}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="
          w-full sm:w-auto
          text-sm
          bg-transparent
          text-gray-700 dark:text-gray-200
          outline-none
          focus:ring-0
          px-2 py-1
        "
      />

      {/* ACTIONS */}
      <div className="flex items-center justify-between sm:justify-start gap-2 sm:ml-2 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 pt-2 sm:pt-0 sm:pl-2">
        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          disabled={!startDate || !endDate || isInvalidDate}
          className="
            inline-flex items-center justify-center
            p-2 rounded-xl
            bg-gradient-to-r from-purple-600 to-amber-500
            text-white
            shadow-md
            hover:shadow-lg hover:scale-105
            active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all
          "
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* CLEAR */}
        {(startDate || endDate) && (
          <button
            onClick={handleClear}
            className="
              text-xs font-semibold
              text-amber-600
              hover:text-purple-700
              transition-colors
            "
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </div>

  {/* ERROR MESSAGE */}
  {isInvalidDate && (
    <span className="block text-xs font-semibold text-red-500 pl-2">
      End date must be after start date
    </span>
  )}
</div>

      </div>

      <DataTable
        data={data?.orders || []}
        columns={orderColumns}
        pagination={data?.pagination}
        onPageChange={setPage}
        meta={{
          onEdit: (order) => {
            setSelectedOrder(order);
            setIsEditModalOpen(true);
          },
          onView: (order) => {
            setSelectedOrder(order);
            setIsViewModalOpen(true);
          },
          onUserClick: (userId) => {
            navigate(`/details/${userId}`);
          },
          onPaymentClick: (orderId) => {
            navigate(`/payment/${orderId}`);
          }
        }}
      />
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
      <OrderItemsModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
}
