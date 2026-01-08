import { useState } from "react";
import DataModal  from "@modal/DataModal";
import {AiOutlineEdit} from "react-icons/ai";


import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const paymentColumns = [
  // Order ID
  columnHelper.accessor(row => row.order?._id || "-", {
    id: "orderId",
    header: "Order ID",
    cell: info => (
      <span className="font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </span>
    ),
  }),

  // Gateway Order ID
  columnHelper.accessor("gatewayOrderId", {
    header: "Gateway Order ID",
    cell: info => (
      <span className="font-medium text-gray-900 dark:text-white">
        {info.getValue() || "-"}
      </span>
    ),
  }),

  // Payment Session ID
   columnHelper.display({
    id: "paymentSessionId",
    header: "Session ID",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const sessionId = row.original.paymentSessionId;

      return (
        <>
          <button
            onClick={() => setOpen(true)}
            disabled={!sessionId}
            className={`text-xs font-medium px-3 py-1 rounded-full border
              ${
                sessionId
                  ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                  : "text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed"
              }`}
          >
            {sessionId ? "View" : "—"}
          </button>

          <DataModal
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Payment Session ID"
            data={sessionId}
          />
        </>
      );
    },
  }),
  // Amount
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: info => (
      <span className="font-semibold text-gray-900 dark:text-white">
        ₹{info.getValue()?.toLocaleString("en-IN")}
      </span>
    ),
  }),

  // Payment Status
  columnHelper.accessor("status", {
    header: "Payment Status",
    cell: info => {
      const status = info.getValue();

      const colors = {
        CREATED: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
        PENDING: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
        SUCCESS: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
        FAILED: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
        ABANDONED: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
      };

      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            colors[status] || colors.PENDING
          }`}
        >
          {status}
        </span>
      );
    },
  }),

  // Webhook Response
   columnHelper.display({
    id: "webhook",
    header: "Webhook",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const webhookData = row.original.webhookResponse;

      return (
        <>
          <button
            onClick={() => setOpen(true)}
            disabled={!webhookData}
            className={`text-xs font-medium px-3 py-1 rounded-full border
              ${
                webhookData
                  ? "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-800"
                  : "text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed"
              }`}
          >
            {webhookData ? "View" : "—"}
          </button>

          <DataModal
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Webhook Response"
            data={webhookData}
            isJson
          />
        </> 
      );
    },
  }),

  // Created At (Timestamp)
  columnHelper.accessor(
    row =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
    {
      id: "createdAt",
      header: "Created At",
      cell: info => (
        <span className="text-gray-600 dark:text-gray-400 text-xs">
          {info.getValue()}
        </span>
      ),
    }
  ),

  // Verified At (Optional but very useful)
  columnHelper.accessor(
    row =>
      row.verifiedAt
        ? new Date(row.verifiedAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
    {
      id: "verifiedAt",
      header: "Verified At",
      cell: info => (
        <span className="text-gray-600 dark:text-gray-400 text-xs">
          {info.getValue()}
        </span>
      ),
    }
  ),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => (
      <button
        onClick={() => table.options.meta?.onEdit?.(row.original)}
        className="p-1.5 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
        title="Edit Payment"
      >
        <AiOutlineEdit className="w-4 h-4" />
      </button>
    ),
  }),
];