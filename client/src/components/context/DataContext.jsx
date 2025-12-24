// src/context/DataContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const DataContext = createContext(null);

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

export const DataProvider = ({ children }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

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
    <DataContext.Provider
      value={{
        isCartDrawerOpen,
        toggleCartDrawer,
        cartState,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* ----------------------------------
   Hook
---------------------------------- */
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used inside DataProvider");
  }
  return context;
};
