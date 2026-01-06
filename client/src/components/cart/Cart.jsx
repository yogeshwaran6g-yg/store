import React from "react";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
import CartItem from "./CartItem";
import { useCartContext } from "../context/CartContext";
import useCheckout from "../../hooks/useCheckout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartState, toggleCartDrawer, removeItem, updateQuantity } =
    useCartContext();
  const { items, cartTotal } = cartState;
  const isEmpty = items.length === 0;
  const { handleCheckout } = useCheckout();
  const navigate = useNavigate();

  const closeCartDrawer = () => {
    toggleCartDrawer();
  };

  const handleProcedToCheckout = () => {
    if (!isEmpty) {
      navigate("/checkout");
    }
    closeCartDrawer();
  };

const yellowButton =
  "w-full bg-yellow-400 text-black font-semibold py-2 rounded-full " +
  "shadow-[0_5px_0_#c9a200] hover:translate-y-[1px] " +
  "hover:shadow-[0_3px_0_#c9a200] active:translate-y-[2px] " +
  "active:shadow-[0_2px_0_#c9a200] transition-all " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-l-2xl shadow-xl z-50">
      
      {/* Header */}
      <div className="w-full px-5 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-xl tracking-wide flex items-center gap-2">
            <IoBagCheckOutline className="text-2xl" />
            Shopping Cart
          </h2>
          <button
            onClick={closeCartDrawer}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
          >
            <IoClose className="text-lg" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto px-4 py-3">
        {isEmpty && (
          <div className="flex flex-col h-full justify-center items-center py-10">
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
              <IoBagHandle className="text-yellow-500 text-4xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg pt-5">
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
      <div className="p-4  bg-gradient-to-r from-purple-600 to-indigo-600 text-wh w-full">
        <button
          onClick={handleProcedToCheckout}
          disabled={isEmpty}
          className={yellowButton}
        >
        <div className="flex justify-between items-center px-3">
  <span className="text-[12px] font-bold uppercase tracking-wide">
    Proceed to Checkout
  </span>
  <span className="bg-white px-1 py-0.5 rounded-full text-[12px] text-purple-700 font-extrabold">
    ₹{cartTotal.toFixed(2)}
  </span>
</div>

        </button>
      </div>
    </div>
  );
};

export default Cart;
