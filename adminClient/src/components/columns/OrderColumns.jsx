import { createColumnHelper } from "@tanstack/react-table";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
const columnHelper = createColumnHelper();

export const orderColumns = [
 
  columnHelper.accessor("invoice", {
    header: "Invoice",
    cell: info => <span className="font-medium text-gray-900 dark:text-white">#{info.getValue()}</span>,
  }),
  columnHelper.accessor("user", {
    header: "User ID",
    cell: info => (
      <button
        onClick={() => info.table.options.meta?.onUserClick?.(info.getValue())}
        className="cursor-pointer text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-mono text-xs underline decoration-dotted capitalize"
        title="View User Details"
      >
        {info.getValue()}
      </button>
    ),
  }),
  columnHelper.accessor("_id", {
    header: "Order ID",
    cell: info => (
      <button
        onClick={() => info.table.options.meta?.onPaymentClick?.(info.getValue())}
        className="cursor-pointer text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-mono text-xs underline decoration-dotted capitalize"
        title="View Payment Details"
      >
        {info.getValue()}
      </button>
    ),
  }),


  columnHelper.accessor(
    row => row.user_info?.name ?? "-",
    {
      id: "customer",
      header: "Customer Name",
      cell: info => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">{info.getValue()}</span>
        </div>
      ),
    }
  ),

  columnHelper.accessor(
    row => row.user_info?.email ?? "-",
    {
      id: "email",
      header: "Email",
      cell: info => <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
    }
  ),

  columnHelper.accessor("total", {
    header: "Total",
    cell: info => (
      <span className="font-semibold text-gray-900 dark:text-white">
        ₹{info.getValue()?.toLocaleString('en-IN') ?? '0'}
      </span>
    ),
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment",
    cell: info => {
      const status = info.getValue()?.toLowerCase();
      const colors = {
        paid: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
        unpaid: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
        failed: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
      };
      
      const theme = colors[status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";

      return (
        <button
          onClick={() => info.table.options.meta?.onPaymentClick?.(info.row.original._id)}
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${theme} capitalize hover:ring-2 hover:ring-indigo-500/20 transition-all cursor-pointer`}
          title="View Payment Details"
        >
          {info.getValue() || "Pending"}
        </button>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: info => {
      const status = info.getValue()?.toLowerCase();
      const colors = {
        pending: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700",
        processing: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
        shipped: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
        delivered: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
        canceled: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
      };
      
      const theme = colors[status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";

      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${theme} capitalize`}>
          {info.getValue() || "Pending"}
        </span>
      );
    },
  }),

  columnHelper.accessor(
    row => row.createdAt
      ? new Date(row.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      : "-",
    {
      id: "date",
      header: "Date",
      cell: info => <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
    }
  ),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.options.meta?.onView?.(row.original)}
          className="p-1.5 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
          title="View Products"
        >
          <AiOutlineEye className="w-4 h-4" />
        </button>
        <button
          onClick={() => table.options.meta?.onEdit?.(row.original)}
          className="p-1.5 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
          title="Edit Status"
        >
          <AiOutlineEdit className="w-4 h-4" />
        </button>
      </div>
    ),
  }),
];
