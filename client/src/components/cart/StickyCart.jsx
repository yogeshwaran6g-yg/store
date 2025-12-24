
import { IoBagHandleOutline } from "react-icons/io5";
import {useCartContext} from "../context/CartContext";

const StickyCart = () => {
  const currency =  "$";
  const { toggleCartDrawer, cartState } = useCartContext();
 

  return (
    <button aria-label="Cart" onClick={toggleCartDrawer} className="absolute">
      <div className="right-0 w-25 float-right fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-tl-lg p-2 text-gray-700">
          <span className="text-2xl mb-1 text-primary">
            <IoBagHandleOutline />
          </span>
          <span className="px-2 text-sm font-serif font-medium">
            {cartState.totalItems} Items
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-primary p-2 text-white text-base font-serif font-medium rounded-bl-lg mx-auto">
          {currency}
          {cartState.cartTotal.toFixed(2)}
        </div>
      </div>
    </button>
  );
};

export default StickyCart;