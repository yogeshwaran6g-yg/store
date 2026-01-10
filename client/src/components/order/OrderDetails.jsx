import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OrderServices from "../../services/OrderServices";
import OrderDetailsSkeleton from "../preloader/OrderDetailsSkeleton";
import { FiArrowLeft } from "react-icons/fi";
import { notifyError } from "../../utils/toast";

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await OrderServices.getOrderById(id);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        notifyError("Failed to fetch order details");
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <OrderDetailsSkeleton />;
  if (error || !data) return null;

  const {
    _id,
    createdAt,
    status,
    cart,
    user,
    shippingAddress,
    subTotal,
    shippingCost,
    discount,
    total,
  } = data;

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200 shadow-xl p-6 mb-8">
          <Link
            to="/user/my-orders"
            className="inline-flex items-center text-sm font-semibold text-purple-700 bg-purple-100 px-4 py-2 rounded-full hover:bg-purple-200 transition"
          >
            <FiArrowLeft className="mr-2" /> Back to Orders
          </Link>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-800">
                Order #{_id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {new Date(createdAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase
                ${
                  status === "Delivered"
                    ? "bg-emerald-100 text-emerald-700"
                    : status === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-indigo-100 text-indigo-700"
                }
              `}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* ===== MOBILE ITEMS ===== */}
            <div className="md:hidden space-y-4">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-purple-200 shadow-sm p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl border object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.price} × {item.quantity}
                      </p>
                      <p className="mt-2 font-bold text-purple-700">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== DESKTOP TABLE ===== */}
            <div className="hidden md:block rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200 shadow-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-purple-50 text-purple-800 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-center">Price</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {cart.map((item, i) => (
                    <tr key={i} className="hover:bg-purple-50/40 transition">
                      <td className="px-6 py-4 flex gap-4 items-center">
                        <img
                          src={item.image}
                          className="w-14 h-14 rounded-xl border object-cover"
                        />
                        <span className="font-medium text-gray-800">
                          {item.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">

            {/* ORDER SUMMARY */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-4 text-lg">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-purple-700">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3 text-lg">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">{user?.name}</span><br />
                {shippingAddress?.address}<br />
                {shippingAddress?.city}, {shippingAddress?.zipCode}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
