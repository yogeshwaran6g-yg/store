import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@utils/axios";
import { endPoints } from "@config/Constants";

export const useUsersList = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      const res = await api.get(endPoints.auth.list, {
        page,
        limit,
      });

      return res.data; // { users, pagination }
    },
    keepPreviousData: true,
    staleTime: 5000, 
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await api.get(endPoints.auth.get(id));
      return res.data; 
    },
    enabled: !!id, 
  });
};

export const useBlockUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const res = await api.put(endPoints.auth.block(id));
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["user", variables]);
            queryClient.invalidateQueries(["users"]);
        }
    })
}
