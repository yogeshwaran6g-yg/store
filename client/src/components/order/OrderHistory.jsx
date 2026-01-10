import { Link } from "react-router-dom";

const OrderHistory = ({ order }) => {
  const displayId =
    order.invoice ||
    (order._id ? order._id.slice(-8).toUpperCase() : "—");

  return (
    <>
      {/* ✅ ID (FIXED) */}
      <td className="px-6 py-4 text-left font-medium">
        {displayId}
      </td>

      {/* Order Time */}
      <td className="px-6 py-4 text-center">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      {/* Method */}
      <td className="px-6 py-4 text-center capitalize">
        {order.paymentMethod}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          {order.status}
        </span>
      </td>

      {/* Total */}
      <td className="px-6 py-4 text-right font-semibold tabular-nums">
        ${Number(
          order.totalAmount ??
          order.totalPrice ??
          order.total ??
          0
        ).toLocaleString()}
      </td>

      {/* Details */}
      <td className="px-6 py-4 text-center w-[120px]">
        <Link
          to={`/user/order/${order._id}`}
          className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium"
        >
          Details
        </Link>
      </td>
    </>
  );
};

export default OrderHistory;
