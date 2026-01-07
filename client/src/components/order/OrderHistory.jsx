import React from "react";

const OrderHistory = ({ order }) => {
  return (
    <>
      {/* ID */}
      <td className="px-6 py-3 text-sm text-left whitespace-nowrap">
        <span className="uppercase font-medium">
          {order?._id?.substring(0, 8)}
        </span>
      </td>

      {/* Order Time */}
      <td className="px-6 py-3 text-sm text-center whitespace-nowrap">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      {/* Payment Method */}
      <td className="px-6 py-3 text-sm text-center whitespace-nowrap">
        {order.paymentMethod}
      </td>

      {/* Status */}
      <td className="px-6 py-3 text-sm text-center whitespace-nowrap">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          {order.status}
        </span>
      </td>

      {/* Total */}
      <td className="px-6 py-3 text-sm text-right font-bold whitespace-nowrap">
        ${order.total}
      </td>
    </>
  );
};

export default OrderHistory;
