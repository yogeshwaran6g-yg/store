import { endPoints } from "@config/Constants";
import { useQuery } from "@tanstack/react-query";
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
        params: {
          page,
          limit,
        },
      });

      return res.data; // { payments, pagination }
    },
    keepPreviousData: true,
  });
};
