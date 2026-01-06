import { endPoints } from "@config/Constants";
import { useQuery } from "@tanstack/react-query";
import {api} from "@utils/axios";

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
