// src/components/Cart.jsx
import React from "react";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
import CartItem from "./CartItem";
import { useCartContext } from "../context/CartContext";
import { dummyCartItems } from "../../config/constants";
import useCheckout from "../../hooks/useCheckout";


const Cart = () => {
  const { cartState, toggleCartDrawer, removeItem, updateQuantity, addItem } = useCartContext();
  const { items, cartTotal } = cartState;
  const isEmpty = items.length === 0;
  const { handleCheckout } = useCheckout();


  const closeCartDrawer = () => {
    toggleCartDrawer();
  };


  const handleProcedToCheckout = () => {
    if (isEmpty) {
      closeCartDrawer();
    } else {
      handleCheckout({
        user_info :{

        }
        
//  user_info: {
//         name: "Test User",
//         email: "user@example.com",
//         contact: "9876543210",
//         address: "123 Test Street",
//         city: "Test City",
//         country: "India",
//         zipCode: "123456",
//       },
      });
      closeCartDrawer();
    }
  };


  const addSampleItem = () => {
      // Add first item from dummy list or a random one
      const sample = dummyCartItems[0];
      // Random ID to allow multiple unique adds for testing if needed
      addItem({ ...sample, id: sample.id + Math.floor(Math.random() * 1000) });
  }

  return (
    <div className="flex flex-col w-full h-full bg-white rounded z-50">
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
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
              <IoBagHandle className="text-primary text-4xl" />
            </div>
            <h3 className="font-semibold text-gray-700 text-lg pt-5">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 pt-2 text-center px-10">
              No items added in your cart.
            </p>
              <button 
                  onClick={addSampleItem}
                  className="mt-5 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
              >
                  Add Sample Item
              </button>
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
          onClick={handleProcedToCheckout}
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
