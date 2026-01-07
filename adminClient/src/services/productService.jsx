import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@utils/axios";
import { endPoints } from "@config/constants";

export const useProducts = ({ page = 1, limit = 10, search, category }) => {
  return useQuery({
    queryKey: ["products", page, limit, search, category],
    queryFn: async () => {
      const res = await api.get(endPoints.product.list, {
        page, limit, search, category 
      });
      return res.data;
    },
    keepPreviousData: true,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(endPoints.product.get(id));
      return res.data;
    },
    enabled: !!id,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post(endPoints.product.add, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(endPoints.product.update(id), data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(endPoints.product.delete(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
