import { api } from "../util/axios";

const authApiBAseUrl = "/api/v1/auth"

const AuthService = {

  login: async ({ phone, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/login`, { phone, password });

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
    return data;
  },

  signup: async ({ name, phone, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/signup`, {
      username: name,
      phone,
      password,
    });
    return data;
  },

  verifyOtp: async ({ phone, otp }) => {
    const { data } = await api.post(`${authApiBAseUrl}/verify-otp`, { phone, otp });
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  },

  resendOtp: async ({ phone }) => {
    const { data } = await api.post(`${authApiBAseUrl}/resend-otp`, { phone });
    return data;
  },

  forgetPassword: async ({ phone }) => {
    const { data } = await api.post(`${authApiBAseUrl}/forgot-password`, { phone });
    return data;
  },

  resetPassword: async ({ phone, otp, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/reset-password`, { phone, otp, password });
    return data;
  },

  updateProfile: async (userData) => {
    const { data } = await api.put(`${authApiBAseUrl}/updateUser`, userData);
    return data;
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await api.put(`${authApiBAseUrl}/changePassword`, { currentPassword, newPassword });
    return data;
  },

  addShippingAddress: async (addressData) => {
      const { data } = await api.post(`${authApiBAseUrl}/addShippingAddress`, addressData);
      return data;
  },

  getMe: async () => {
    const { data } = await api.get(`${authApiBAseUrl}/me`);
    return data;
  },



  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },


};

export default AuthService;
