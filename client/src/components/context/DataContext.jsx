// src/context/DataContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
} from "react";





const DataContext = createContext(null);

export const DataProvider = ({ children }) => {

    const [isCartDrawerOpen,setIsCartDrawerOpen] =useState(false);

    function toggleCartDrawer (){
        setIsCartDrawerOpen(!isCartDrawerOpen);
    }




  
  return (
    <DataContext.Provider
      value={{
        isCartDrawerOpen,
        toggleCartDrawer

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
    throw new Error(
      "useDataContext must be used inside DataProvider"
    );
  }
  return context;
};
