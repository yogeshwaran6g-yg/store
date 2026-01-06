import { useState } from "react";
import DataModal  from "@modal/DataModal";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const paymentColumns = [
  // Order ID
  columnHelper.accessor(row => row.order?._id || "-", {
    id: "orderId",
    header: "Order ID",
    cell: info => (
      <span className="font-medium text-gray-900">
        {info.getValue()}
      </span>
    ),
  }),

  // Gateway Order ID
  columnHelper.accessor("gatewayOrderId", {
    header: "Gateway Order ID",
    cell: info => (
      <span className="font-medium text-gray-900">
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
                  ? "text-indigo-700 bg-indigo-100 border-indigo-200 hover:bg-indigo-200"
                  : "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
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
      <span className="font-semibold text-gray-900">
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
        CREATED: "bg-blue-100 text-blue-700 border-blue-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        SUCCESS: "bg-emerald-100 text-emerald-700 border-emerald-200",
        FAILED: "bg-red-100 text-red-700 border-red-200",
        ABANDONED: "bg-gray-100 text-gray-700 border-gray-200",
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
                  ? "text-emerald-700 bg-emerald-100 border-emerald-200 hover:bg-emerald-200"
                  : "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
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
        <span className="text-gray-500 text-xs">
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
        <span className="text-gray-500 text-xs">
          {info.getValue()}
        </span>
      ),
    }
  ),
];