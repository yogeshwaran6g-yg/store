// src/components/Cart.jsx
import React, { useState } from "react";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
import CartItem from "./CartItem";
import { dummyCartItems } from "../../config/constants";
import {useDataContext} from "../context/DataContext";


const Cart = () => {
  const [items, setItems] = useState(dummyCartItems);
  const {toggleCartDrawer} = useDataContext();
  const isEmpty = items.length === 0;

  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const closeCartDrawer = () => {
    toggleCartDrawer();
  };

  const handleCheckout = () => {
    if (isEmpty) {
      closeCartDrawer();
    } else {
      alert("Proceeding to checkout (dummy)");
      closeCartDrawer();
    }
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded z-50
      "
      
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-indigo-50">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <IoBagCheckOutline /> Shopping Cart
        </h2>
        <button
          onClick={closeCartDrawer}
          className="flex items-center gap-1 text-gray-500 hover:text-red-400"
        >
          <IoClose /> Close
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto">
        {isEmpty && (
          <div className="flex flex-col h-full justify-center items-center py-10">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <IoBagHandle className="text-primary text-4xl" />
            </div>
            <h3 className="font-semibold text-gray-700 text-lg pt-5">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 pt-2 text-center px-10">
              No items added in your cart.
            </p>
          </div>
        )}

        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQty={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mx-5 my-3">
        <button
          onClick={handleCheckout}
          className="w-full py-3 rounded-lg bg-primary hover:bg-primary flex justify-between items-center text-white font-medium px-3"
        >
          <span>Proceed To Checkout</span>
          <span className="bg-white text-primary px-3 py-1 rounded-lg font-bold">
            ₹{cartTotal.toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
