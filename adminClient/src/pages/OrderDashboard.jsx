import { useState } from "react";
import { orderColumns } from "@columns/OrderColumns";
import DataTable from "@/components/DataTable";
import { useOrdersList } from "@services/orderService";
import { Search } from "lucide-react";

export default function Orders() {
  const [page, setPage] = useState(1);
  
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

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
        
        <div className="flex flex-col items-end gap-1">
          <div className={`flex bg-white items-center gap-2 border p-1.5 pl-3 rounded-lg shadow-sm ${isInvalidDate ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'}`}>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-600 outline-none p-1"
              placeholder="Start Date"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-600 outline-none p-1"
              placeholder="End Date"
            />
            
            <div className="flex items-center gap-1 border-l pl-2 ml-1">
              <button 
                onClick={handleSearch}
                disabled={!startDate || !endDate || isInvalidDate}
                className="p-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Search Dates"
              >
                <Search className="w-4 h-4" />
              </button>
              
              {(startDate || endDate) && (
                <button 
                  onClick={handleClear}
                  className="text-xs text-red-500 hover:text-red-700 px-2 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {isInvalidDate && (
            <span className="text-xs text-red-500 font-medium">End date must be after start date</span>
          )}
        </div>
      </div>

      <DataTable
        data={data?.orders || []}
        columns={orderColumns}
        pagination={data?.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
