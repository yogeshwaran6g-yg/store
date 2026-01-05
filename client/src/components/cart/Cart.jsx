// // src/components/Cart.jsx
// import React from "react";
// import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
// import CartItem from "./CartItem";
// import { useCartContext } from "../context/CartContext";
// import { dummyCartItems } from "../../config/constants";


// const Cart = () => {
//   const { cartState, toggleCartDrawer, removeItem, updateQuantity, addItem } = useCartContext();
//   const { items, cartTotal } = cartState;
//   const isEmpty = items.length === 0;


//   const closeCartDrawer = () => {
//     toggleCartDrawer();
//   };

//   const handleCheckout = () => {
//     if (isEmpty) {
//       closeCartDrawer();
//     } else {
//       alert("Proceeding to checkout (dummy)");
//       closeCartDrawer();
//     }
//   };


//   const addSampleItem = () => {
//       // Add first item from dummy list or a random one
//       const sample = dummyCartItems[0];
//       // Random ID to allow multiple unique adds for testing if needed
//       addItem({ ...sample, id: sample.id + Math.floor(Math.random() * 1000) });
//   }

//   return (
//     <div className="flex flex-col w-full h-full bg-white rounded z-50">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-indigo-50">
//         <h2 className="font-semibold text-lg flex items-center gap-2">
//           <IoBagCheckOutline /> Shopping Cart
//         </h2>
//         <button
//           onClick={closeCartDrawer}
//           className="flex items-center gap-1 text-gray-500 hover:text-red-400"
//         >
//           <IoClose /> Close
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-grow overflow-y-auto">
//         {isEmpty && (
//           <div className="flex flex-col h-full justify-center items-center py-10">
//             <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
//               <IoBagHandle className="text-primary text-4xl" />
//             </div>
//             <h3 className="font-semibold text-gray-700 text-lg pt-5">
//               Your cart is empty
//             </h3>
//             <p className="text-sm text-gray-500 pt-2 text-center px-10">
//               No items added in your cart.
//             </p>
//               <button 
//                   onClick={addSampleItem}
//                   className="mt-5 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
//               >
//                   Add Sample Item
//               </button>
//           </div>
//         )}

//         {items.map((item) => (
//           <CartItem
//             key={item.id}
//             item={item}
//             onUpdateQty={updateQuantity}
//             onRemove={removeItem}
//           />
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="mx-5 my-3">
//         <button
//           onClick={handleCheckout}
//           className="w-full py-3 rounded-lg bg-primary hover:bg-primary flex justify-between items-center text-white font-medium px-3"
//         >
//           <span>Proceed To Checkout</span>
//           <span className="bg-white text-primary px-3 py-1 rounded-lg font-bold">
//             ₹{cartTotal.toFixed(2)}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React from "react";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
import CartItem from "./CartItem";
import { useCartContext } from "../context/CartContext";
import { dummyCartItems } from "../../config/constants";

const Cart = () => {
  const { cartState, toggleCartDrawer, removeItem, updateQuantity, addItem } =
    useCartContext();

  const { items, cartTotal } = cartState;
  const isEmpty = items.length === 0;

  const closeCartDrawer = () => toggleCartDrawer();

  const handleCheckout = () => {
    if (isEmpty) {
      closeCartDrawer();
    } else {
      alert("Proceeding to checkout");
      closeCartDrawer();
    }
  };

  const addSampleItem = () => {
    const sample = dummyCartItems[0];
    addItem({ ...sample, id: sample.id + Date.now() });
  };

  return (
    <div
      className="
        flex flex-col w-full h-full
        bg-gradient-to-b from-purple-50 via-blue-50 to-white
    
        overflow-hidden
        shadow-2xl
        z-50
      "
    >
      {/* HEADER */}
      <div
        className="
          flex justify-between items-center
          px-4 py-3
          bg-gradient-to-r from-purple-600 to-blue-600
          text-white
        "
      >
        <h2 className="font-semibold text-sm flex items-center gap-2 tracking-wide">
          <IoBagCheckOutline className="text-yellow-300" />
          Shopping Cart
        </h2>

        <button
          onClick={closeCartDrawer}
          className="
            h-8 w-8 flex items-center justify-center
            rounded-full
            bg-white/20 hover:bg-white/30
            transition
          "
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-grow overflow-y-auto overscroll-contain px-2">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div
              className="
                w-16 h-16 rounded-full
                bg-gradient-to-r from-yellow-400 to-yellow-300
                flex items-center justify-center
                shadow-md
              "
            >
              <IoBagHandle className="text-purple-700 text-3xl" />
            </div>

            <h3 className="font-semibold text-gray-800 text-base mt-4">
              Your cart is empty
            </h3>

            <p className="text-sm text-gray-500 mt-1 px-8">
              Looks like you haven’t added anything yet.
            </p>

            <button
              onClick={addSampleItem}
              className="
                mt-4
                px-5 py-2
                rounded-full
                bg-gradient-to-r from-yellow-400 to-yellow-300
                text-black font-semibold text-sm
                shadow-[0_6px_0_#d9a400]
                hover:translate-y-0.5
                hover:shadow-[0_3px_0_#d9a400]
                transition-all
              "
            >
              Add Sample Item
            </button>
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="border-b last:border-b-0 border-gray-100"
          >
            <CartItem
              item={item}
              onUpdateQty={updateQuantity}
              onRemove={removeItem}
            />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        className="
          px-4 py-3
          bg-gradient-to-r from-purple-600 to-blue-600
          shadow-[0_-6px_20px_rgba(0,0,0,0.15)]
        "
      >
        <button
          onClick={handleCheckout}
          className="
            w-full flex items-center justify-between
            bg-gradient-to-r from-yellow-400 to-yellow-300
            text-black
            px-4 py-2.5
            rounded-xl
            shadow-[0_6px_0_#d9a400]
            hover:translate-y-0.5
            hover:shadow-[0_3px_0_#d9a400]
            transition-all
          "
        >
          <span className="text-sm font-semibold tracking-wide">
            Proceed to Checkout
          </span>

          <span
            className="
              bg-white
              text-purple-700
              px-3 py-1
              rounded-lg
              text-sm font-bold
              shadow-sm
            "
          >
            ₹{cartTotal.toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
