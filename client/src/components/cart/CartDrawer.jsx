import React from "react";
import { useDataContext } from "../context/DataContext";
import Cart from "./Cart";

const CartDrawer = () => {
  const { isCartDrawerOpen, toggleCartDrawer } = useDataContext();

  return (
    <>
      {/* Backdrop */}
      {isCartDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleCartDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-primary z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Cart />
      </div>
    </>
  );
};

export default CartDrawer;
