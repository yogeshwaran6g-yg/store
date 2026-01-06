import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const orderColumns = [
 
  columnHelper.accessor("invoice", {
    header: "Invoice",
    cell: info => <span className="font-medium text-gray-900">#{info.getValue()}</span>,
  }),

  columnHelper.accessor(
    row => row.user_info?.name ?? "-",
    {
      id: "customer",
      header: "Customer Name",
      cell: info => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        </div>
      ),
    }
  ),

  columnHelper.accessor(
    row => row.user_info?.email ?? "-",
    {
      id: "email",
      header: "Email",
      cell: info => <span className="text-gray-500">{info.getValue()}</span>,
    }
  ),

  columnHelper.accessor("total", {
    header: "Total",
    cell: info => (
      <span className="font-semibold text-gray-900">
        ₹{info.getValue()?.toLocaleString('en-IN') ?? '0'}
      </span>
    ),
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment",
    cell: info => {
      const status = info.getValue()?.toLowerCase();
      const colors = {
        paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        failed: "bg-red-100 text-red-700 border-red-200",
        default: "bg-gray-100 text-gray-700 border-gray-200"
      };
      
      const theme = colors[status] || colors.default;

      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${theme} capitalize`}>
          {info.getValue() || "Pending"}
        </span>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: info => {
      const status = info.getValue()?.toLowerCase();
      const colors = {
        delivered: "bg-green-100 text-green-700 border-green-200",
        processing: "bg-blue-100 text-blue-700 border-blue-200",
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        cancelled: "bg-red-100 text-red-700 border-red-200",
        default: "bg-gray-100 text-gray-700 border-gray-200"
      };
      
      const theme = colors[status] || colors.default;

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
      cell: info => <span className="text-gray-500">{info.getValue()}</span>,
    }
  ),
];


// Payment Columns
export const paymentColumns = [
  columnHelper.accessor("gatewayOrderId", {
    header: "Gateway Order ID",
    cell: info => <span className="font-medium text-gray-900">{info.getValue() || "-"}</span>,
  }),

  columnHelper.accessor("amount", {
    header: "Amount",
    cell: info => (
      <span className="font-semibold text-gray-900">
        ₹{info.getValue()?.toLocaleString('en-IN') ?? '0'}
      </span>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: info => {
      const status = info.getValue()?.toUpperCase();
      const colors = {
        SUCCESS: "bg-emerald-100 text-emerald-700 border-emerald-200",
        created: "bg-blue-100 text-blue-700 border-blue-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        FAILED: "bg-red-100 text-red-700 border-red-200",
        ABANDONED: "bg-gray-100 text-gray-700 border-gray-200"
      };
      
      const theme = colors[status] || colors.PENDING;

      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${theme}`}>
          {status}
        </span>
      );
    },
  }),

  columnHelper.accessor("gateway", {
    header: "Gateway",
    cell: info => <span className="text-gray-600 font-medium">{info.getValue()}</span>,
  }),

  columnHelper.accessor(
    row => row.createdAt
      ? new Date(row.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      : "-",
    {
      id: "date",
      header: "Date Time",
      cell: info => <span className="text-gray-500 text-xs">{info.getValue()}</span>,
    }
  ),
];


const orderBase = "api/v1/order"
const paymentBase = "api/v1/payment"

export const endPoints = {
    order : {
        list : `${orderBase}/getAllOrders`,
    },
    payment: {
        list: `${paymentBase}/getAllPayments`
    }
}