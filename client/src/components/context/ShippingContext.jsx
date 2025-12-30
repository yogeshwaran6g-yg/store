import { createContext, useContext, useMemo } from "react";

const ShippingContext = createContext(null);

export const ShippingProvider = ({ children }) => {
  const shippingData = useMemo(() => [
    {
      id: 1,
      icon: "truck",
      text: "Fast & reliable delivery across India",
    },
    {
      id: 2,
      icon: "home",
      text: "Home delivery available",
    },
    {
      id: 3,
      icon: "dollar",
      text: "Cash on delivery supported",
    },
    {
      id: 4,
      icon: "repeat",
      text: "Easy 7-day replacement policy",
    },
    {
      id: 5,
      icon: "shield",
      text: "100% secure payments",
    },
    {
      id: 6,
      icon: "sun",
      text: "Customer support 7 days a week",
    },
    {
      id: 7,
      icon: "map",
      text: "Delivery available in most locations",
    },
  ], []);

  const value = useMemo(() => ({ shippingData }), [shippingData]);

  return (
    <ShippingContext.Provider value={value}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within ShippingProvider");
  }
  return context;
};
