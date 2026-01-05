import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import AuthService from "@/services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ hasShippingAddress, setHasShippingAddress ] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("accessToken");

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth init error:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await AuthService.login(credentials);
    setUser(data.user);
    return data;
  }, []);

  const signup = useCallback(async (userData) => {
    const data = await AuthService.signup(userData);
    return data;
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const forgetPassword = useCallback(async (email) => {
    return await AuthService.forgetPassword(email);
  }, []);

  const resetPassword = useCallback(async (data) => {
    return await AuthService.resetPassword(data);
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    forgetPassword,
    resetPassword,
    hasShippingAddress
  }), [user, loading, login, signup, logout, forgetPassword, resetPassword, hasShippingAddress]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
