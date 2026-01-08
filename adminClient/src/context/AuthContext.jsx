
import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import authService from "@services/authService";
import { toast } from "react-toastify";

export const DataContext = createContext();

export function DataContextProvider ({children}){
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const logoutTimerRef = useRef(null);
    
    // Check for existing token on mount
    useEffect(() => {
      const initAuth = async () => {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          const decoded = authService.decodeToken(token);
          const currentTime = Date.now() / 1000;

          if (decoded && decoded.exp > currentTime) {
            setUser(JSON.parse(storedUser));
            setupAutoLogout(decoded.exp - currentTime);
          } else {
            logout();
          }
        }
        setLoading(false);
      };

      initAuth();
    }, []);

    const setupAutoLogout = (seconds) => {
       if (logoutTimerRef.current) {
         clearTimeout(logoutTimerRef.current);
       }
       
       logoutTimerRef.current = setTimeout(() => {
         logout();
         toast.info("Session expired. Please login again.");
       }, seconds * 1000);
    };

    const loginUser = async (email, password) => {
      setLoading(true);
      try {
        const res = await authService.login(email, password);
        // Assuming res contains { token, user } or similar structure
        const { token, user: userData } = res.data; 
        console.log({userData})
        
        // Admin Check
        if(userData.role !== 'admin' && userData.role !== 'super_admin') {
           throw new Error("Not authorized as admin");
        }

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
        const decoded = authService.decodeToken(token);
        if (decoded?.exp) {
           const currentTime = Date.now() / 1000;
           setupAutoLogout(decoded.exp - currentTime);
        }

        toast.success("Login Successful!");
        return true;
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Login Failed");
        return false;
      } finally {
        setLoading(false);
      }
    };

    const logout = () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
      authService.logout();
      setUser(null);
      // Optional: redirect happens via ProtectedRoute usually, or explicit navigation
    };

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

   const value = useMemo(() => ({
     user,
     setUser,
     isAuthenticated: !!user,
     loading,
     isSidebarOpen,
     toggleSidebar,
     loginUser,
     logout
   }), [user, loading, isSidebarOpen]);
 
   return (
     <DataContext.Provider value={value}>
       {children}
     </DataContext.Provider>
   );

}

export function useAuthContext(){
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a DataContextProvider");
    }
  return context;

}
