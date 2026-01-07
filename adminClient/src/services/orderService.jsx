import { endPoints } from "@config/Constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {api} from "@utils/axios";
import { toast } from "react-toastify";

const axios = api
export const useOrdersList = ({
  page = 1,
  limit = 10,
  status,
  customerName,
  startDate,
  endDate,
}) => {
  return useQuery({
    queryKey: ["orders", page, limit, status, customerName, startDate, endDate],
    queryFn: async () => {
      const res = await axios.get(endPoints.order.list, {        
          page,
          limit,
          status,
          customerName,
          startDate,
          endDate,        
      });

      return res.data; // { orders, pagination }
    },
    keepPreviousData: true,
  });
};

export const useCustomerOrders = ({ id, page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["customer-orders", id, page, limit],
    queryFn: async () => {
      const res = await api.get(endPoints.order.customerOrders(id), {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!id,
    keepPreviousData: true,
  });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axios.put(endPoints.order.update(id), { status });
            return res.data;
        },
        onSuccess: () => {
             toast.success("Order updated successfully");
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["customer-orders"]);
        },
        onError: (error) => {
             toast.error(error.response?.data?.message || "Update failed");
        }
    });
};
