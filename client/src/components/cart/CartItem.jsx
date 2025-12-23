// src/components/CartItem.jsx
import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="flex items-center bg-white py-3 px-4 border-b border-gray-200 hover:bg-gray-50">
      <img
        src={item.image}
        alt={item.title}
        className="w-10 h-10 rounded mr-4"
      />

      <div className="flex flex-col w-full">
        <p className="truncate text-sm font-medium text-gray-700">
          {item.title}
        </p>
        <span className="text-xs text-gray-400 mb-1">
          Item Price ₹{item.price}
        </span>

        <div className="flex items-center justify-between">
          <span className="font-bold text-sm">
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>

          <div className="flex items-center gap-2 border border-gray-200 px-2 py-1 rounded">
            <button
              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            >
              <FiMinus />
            </button>
            <span className="font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            >
              <FiPlus />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-400 hover:text-red-600"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
