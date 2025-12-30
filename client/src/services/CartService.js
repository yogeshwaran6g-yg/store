import { api } from "../util/axios";

const CART_URL = "api/v1/cart";

const CartService = {
  getCart: async () => {
    const { data } = await api.get(CART_URL);
    return data;
  },

  addToCart: async ({ productId, quantity }) => {
    const { data } = await api.post(`${CART_URL}/add`, { productId, quantity });
    return data;
  },

  removeFromCart: async (productId) => {
    const { data } = await api.delete(`${CART_URL}/remove/${productId}`);
    return data;
  },

  updateQuantity: async ({ productId, quantity }) => {
    const { data } = await api.put(`${CART_URL}/update`, {
      productId,
      quantity,
    });
    return data;
  },

  clearCart: async () => {
    const { data } = await api.delete(`${CART_URL}/clear`);
    return data;
  },
};

export default CartService;
