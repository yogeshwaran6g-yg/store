// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "./AuthContext";
import CartService from "@/services/CartService";

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
      console.log("clear cart happens")
        return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const prevAuth = useRef(isAuthenticated);

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

  // Sync with DB when user logs in
  useEffect(() => {
    // If loading auth, do nothing yet
    if (loading) return;

    if (isAuthenticated) {
        const syncAndFetch = async () => {
             try {
                 // Strategy:
                 // 1. Fetch Cart from DB first (Source of Truth)
                 const dbCart = await CartService.getCart();
                 let currentDbItems = [];

                 if (dbCart && dbCart.items) {
                     currentDbItems = dbCart.items;
                 }

                 // 2. Identify Local items that are NOT in DB
                 const localData = localStorage.getItem(CART_STORAGE_KEY);
                 const localItems = localData ? JSON.parse(localData) : [];
                 
                 const itemsToSync = localItems.filter(localItem => {
                     // Check if this product ID exists in DB cart
                     // DB item product is an object (populated) or ID?
                     // getCart populates 'product', so it's an object. 
                     // We need to compare IDs.
                     return !currentDbItems.some(dbItem => {
                         const dbProductId = dbItem.product._id || dbItem.product; // Handle populated or raw
                         return dbProductId === (localItem.id || localItem._id);
                     });
                 });

                 // 3. Add only missing items to DB
                 if (itemsToSync.length > 0) {
                     await Promise.all(itemsToSync.map(item => 
                         CartService.addToCart({ 
                             productId: item.id || item._id, 
                             quantity: item.quantity 
                         }).catch(err => console.error("Merge error", err))
                     ));
                     
                     // 4. Re-fetch DB cart to get final state (including newly added items)
                     const updatedDbCart = await CartService.getCart();
                     if (updatedDbCart && updatedDbCart.items) {
                         currentDbItems = updatedDbCart.items;
                     }
                 }

                 // 5. Update Local State with Final DB State
                 if (currentDbItems) {
                     const mappedItems = currentDbItems.map(i => ({
                          id: i.product._id,
                          title: i.product.title,
                          // Access nested prices object as populated in controller
                          price: i.product.prices ? i.product.prices.price : i.product.price, 
                          image: (i.product.images && i.product.images.length > 0) ? i.product.images[0] : null,
                          quantity: i.quantity,
                          slug: i.product.slug
                     }));
                     
                     dispatch({ type: "INIT_CART", payload: mappedItems });
                 }
             } catch (error) {
                 console.error("Failed to sync cart", error);
             }
        };
        
        syncAndFetch();
    } else {
        // When logging out, clear the cart state
        // Only clear if we were previously authenticated (explicit logout)
        if (prevAuth.current) {
            dispatch({ type: "CLEAR_CART" });
        }
    }
    
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated, loading]);


  // Persist to LocalStorage (Always)
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));
  }, [cartState.items]);

  const toggleCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(prev => !prev);
  }, []);

  const addItem = useCallback(async (product, quantity = 1) => {
    // Optimistic Update
    dispatch({
        type: "ADD_ITEM",
        payload: {
            id: product._id || product.id,
            title: product.title,
            price: product.prices ? product.prices.price : product.price,
            image: Array.isArray(product.images) ? product.images[0] : (product.image || (Array.isArray(product.image) ? product.image[0] : product.image)),
            quantity
        }
    });

    if (isAuthenticated) {
        try {
            await CartService.addToCart({ 
                productId: product._id || product.id, 
                quantity 
            });
        } catch (error) {
            console.error("Add to cart API failed", error);
        }
    }

    if (!isCartDrawerOpen) {
        setIsCartDrawerOpen(true);
    }
  }, [isCartDrawerOpen, isAuthenticated]);

  const removeItem = useCallback(async (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
      
      if (isAuthenticated) {
          try {
              await CartService.removeFromCart(id);
          } catch (error) {
              console.error("Remove item API failed", error);
          }
      }
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (id, quantity) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
      
      if (isAuthenticated) {
          try {
              await CartService.updateQuantity({ productId: id, quantity });
          } catch (error) {
               console.error("Update quantity API failed", error);
          }
      }
  }, [isAuthenticated]);
  
  const clearCart = useCallback(async () => {
      dispatch({ type: "CLEAR_CART" });
      if (isAuthenticated) {
          try {
             "clear cart api called"
              await CartService.clearCart();
          } catch (error) {
             console.error("Clear cart API failed", error);
          }
      }
  }, [isAuthenticated]);

  const value = useMemo(() => ({
    isCartDrawerOpen,
    toggleCartDrawer,
    cartState,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }), [
    isCartDrawerOpen,
    toggleCartDrawer,
    cartState,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  ]);

  return (
    <CartContext.Provider value={value}>
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
