import { endPoints } from "@config/Constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "@utils/axios";

const axios = api;

export const usePaymentsList = ({
  page = 1,
  limit = 10,
  status,
}) => {
  return useQuery({
    queryKey: ["payments", page, limit, status],
    queryFn: async () => {
      const res = await axios.get(endPoints.payment.list, {
        page,
        limit,
        status,
      });

      return res.data; // { payments, pagination }
    },
    keepPreviousData: true,
  });
};


export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axios.put(endPoints.payment.update(id), { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment updated successfully");
      queryClient.invalidateQueries(["payments"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    }
  });
};

export const usePaymentByOrderId = (id) => {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axios.get(endPoints.payment.getPaymentByOrderId(id));
      return res.data;
    },
    enabled: !!id,
  });
};
