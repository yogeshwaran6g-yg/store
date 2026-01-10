import React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { Link } from "react-router-dom";



const OrderHistory = ({ order }) => {
  const [, copy] = useCopyToClipboard();

  return (
    <>
      {/* ID */}
      <td className="px-6 py-3 text-sm text-left whitespace-nowrap">
        <span
          className="uppercase font-medium cursor-pointer"
          title="copy"
          onClick={() => copy(order?._id)}
        >
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

      {/* Details */}
      <td className="px-6 py-3 text-sm text-center whitespace-nowrap">
        <Link
            to={`/user/order/${order._id}`}
            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-md text-xs font-semibold hover:bg-purple-100 transition-colors"
        >
            Details
        </Link>
      </td>
    </>
  );
};

export default OrderHistory;
