import { api } from "../util/axios";

const authApiBAseUrl = "/api/v1/auth"

const AuthService = {

  login: async ({ email, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/login`, { email, password });

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  },

  signup: async ({ name, email, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/signup`, {
      name,
      email,
      password,
    });
    return data;
  },

  forgetPassword: async ({ email }) => {
    const { data } = await api.post(`${authApiBAseUrl}/forget-password`, { email });
    return data;
  },

  resetPassword: async ({ token, password }) => {
    const { data } = await api.post(`${authApiBAseUrl}/reset-password/${token}`, { password });
    return data;
  },

  updateProfile: async (userData) => {
    const { data } = await api.put(`${authApiBAseUrl}/update-user`, userData);
    return data;
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await api.put(`${authApiBAseUrl}/change-password`, { currentPassword, newPassword });
    return data;
  },

  addShippingAddress: async (addressData) => {
      const { data } = await api.post(`${authApiBAseUrl}/add-shipping-address`, addressData);
      return data;
  },



  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },


};

export default AuthService;
