import { endPoints } from "@config/Constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "@utils/axios";

const axios = api;

export const usePaymentsList = ({
  page = 1,
  limit = 10,
}) => {
  return useQuery({
    queryKey: ["payments", page, limit],
    queryFn: async () => {
      const res = await axios.get(endPoints.payment.list, {        
          page,
          limit,
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
