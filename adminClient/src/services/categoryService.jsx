import { useQuery } from "@tanstack/react-query";
import { api } from "@utils/axios";
import { endPoints } from "@config/constants";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get(endPoints.category.list);
      return res.data;
    },
  });
};
