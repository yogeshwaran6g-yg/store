import React from 'react';

const OrderHistory = ({ order }) => {
  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">{order._id.substring(0, 8)}</span>
      </td>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
      </td>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="text-sm">{order.paymentMethod}</span>
      </td>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="text-sm">{order.status}</span>
      </td>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="text-sm font-bold">${order.total}</span>
      </td>
    </>
  );
};

export default OrderHistory;
