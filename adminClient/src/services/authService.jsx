import { api } from "@utils/axios";

// Helper to decode JWT payload safely
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const authService = {
  login: async (email, password) => {
    // 1. Call Login API
    const res = await api.post("/api/v1/auth/login", { email, password });
    
    // 2. Return data (token, user)
    // Adjust based on your actual API response structure
    // Typically: { token, user: {...} } or { data: { token, user } }
    return res; 
  },

  getMe: async () => {
    return api.get("/api/v1/auth/me");
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Any API call if needed
  },

  decodeToken
};

export default authService;
