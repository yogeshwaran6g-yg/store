import React, { createContext, useState, useMemo, useContext, useCallback } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = useCallback((p) => {
    setCurrentPage(p);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      currentPage,
      handleChangePage,
    }),
    [isLoading, currentPage, handleChangePage]
  );

 
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};



export const useSideBar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSideBar must be used within an SidebarProvider");
  }
  return context;
};


