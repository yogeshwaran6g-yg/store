import { useQuery } from "@tanstack/react-query";
import { api } from "@utils/axios";
import { endPoints } from "@config/constants";

export const useUserCart = (userId) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await api.get(endPoints.cart.getUserCart(userId));
      return res.data;
    },
    enabled: !!userId,
  });
};
