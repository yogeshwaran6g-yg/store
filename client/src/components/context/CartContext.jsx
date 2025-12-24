// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "ecommerce_cart";

const initialState = {
  items: [],
  totalItems: 0,
  cartTotal: 0,
};

const calculateCartTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, cartTotal };
};

const cartReducer = (state, action) => {
  let newItems;
  switch (action.type) {
    case "INIT_CART":
      return {
        ...state,
        items: action.payload,
        ...calculateCartTotals(action.payload),
      };
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems),
      };

    case "REMOVE_ITEM":
      newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems),
      };

    case "UPDATE_QUANTITY":
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.id !== id);
      } else {
        newItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems),
      };
      
    case "CLEAR_CART":
        return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const scrollBarHide = React.useCallback(() => {
    if (isCartDrawerOpen) {
      // Disable background scroll    
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
    }
  }, [isCartDrawerOpen]);
  
  useEffect(() => {
    scrollBarHide();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartDrawerOpen]);

  // Initialize reducer with lazy initialization from localStorage
  const [cartState, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const localData = localStorage.getItem(CART_STORAGE_KEY);
      const parsedItems = localData ? JSON.parse(localData) : [];
      return {
        items: parsedItems,
        ...calculateCartTotals(parsedItems),
      };
    } catch (error) {
      console.error("Failed to parse cart from local storage", error);
      return initialState;
    }
  });

  function toggleCartDrawer() {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  }

  const addItem = (product, quantity = 1) => {
    dispatch({
        type: "ADD_ITEM",
        payload: {
            id: product._id || product.id,
            title: product.title,
            price: product.prices ? product.prices.price : product.price,
            image: Array.isArray(product.image) ? product.image[0] : product.image,
            quantity
        }
    });
    if (!isCartDrawerOpen) {
        setIsCartDrawerOpen(true);
    }
  };

  const removeItem = (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id, quantity) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  // Sync to local storage and placeholder API
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));

    // Placeholder API Sync
    const syncCartWithDB = async () => {
        // Here we would use the api util to sync with backend
        // const response = await api.post(endPoints.CART.POST, { items: cartState.items });
        console.log("Creating/Syncing cart with DB (Placeholder)...", cartState.items);
    };

    // Debounce or just call it
    const timeoutId = setTimeout(() => {
        syncCartWithDB();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [cartState.items]);

  return (
    <CartContext.Provider
      value={{
        isCartDrawerOpen,
        toggleCartDrawer,
        cartState,
        dispatch,
        addItem,
        removeItem,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ----------------------------------
   Hook
---------------------------------- */
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside CartProvider");
  }
  return context;
};
