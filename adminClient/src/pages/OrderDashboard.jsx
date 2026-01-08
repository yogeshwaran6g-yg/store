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
        
        <div className="flex flex-col items-end gap-1">
          <div className={`flex bg-white dark:bg-[#2d2d2d] items-center gap-2 border p-1.5 pl-3 rounded-lg shadow-sm ${isInvalidDate ? 'border-red-300 ring-1 ring-red-100 dark:border-red-700 dark:ring-red-900' : 'border-gray-200 dark:border-gray-700'}`}>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-600 dark:text-gray-300 dark:bg-[#2d2d2d] outline-none p-1"
              placeholder="Start Date"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-600 dark:text-gray-300 dark:bg-[#2d2d2d] outline-none p-1"
              placeholder="End Date"
            />
            
            <div className="flex items-center gap-1 border-l dark:border-gray-700 pl-2 ml-1">
              <button 
                onClick={handleSearch}
                disabled={!startDate || !endDate || isInvalidDate}
                className="p-1.5 bg-gray-900 dark:bg-indigo-600 text-white rounded-md hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Search Dates"
              >
                <Search className="w-4 h-4" />
              </button>
              
              {(startDate || endDate) && (
                <button 
                  onClick={handleClear}
                  className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {isInvalidDate && (
            <span className="text-xs text-red-500 dark:text-red-400 font-medium">End date must be after start date</span>
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
