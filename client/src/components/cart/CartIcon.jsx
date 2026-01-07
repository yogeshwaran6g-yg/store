import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "@context/CartContext";

const CartIcon = ({ onClick }) => {
  const { cartState, toggleCartDrawer } = useCartContext();
  const cartCount = cartState.totalItems || 0;

  return (
    <motion.button
      onClick={toggleCartDrawer}
      aria-label="Cart"
      className="
        relative
        bg-yellow-400
        text-black
        font-bold
        w-12 h-12
        rounded-full
        shadow-[0_6px_0_#c9a200]
        flex items-center justify-center
        m-2
      "
      whileHover={{
        y: 2,
        boxShadow: "0px 4px 0px #c9a200",
      }}
      whileTap={{
        y: 4,
        boxShadow: "0px 2px 0px #c9a200",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Cart Icon */}
      <FaShoppingCart size={22} />

      {/* Item Count Badge */}
      {cartCount > 0 && (
        <motion.span
          key={cartCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="
            absolute
            -top-1 -right-1
            bg-black
            text-yellow-400
            text-xs
            font-bold
            min-w-[18px]
            h-[18px]
            px-1
            rounded-full
            flex items-center justify-center
          "
        >
          {cartCount}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartIcon;
