import React, { createContext, useReducer, useContext, useCallback, useMemo } from "react";
import OrderServices from "../../services/OrderServices";
import { notifyError} from "../../utils/toast";

const OrderContext = createContext();

const initialState = {
  orders: [],
  orderOverview: {
    totalOrder: 0,
    totalAmount: 0,
    todayOrder: [],
    totalAmountOfThisMonth: 0,
    totalPendingOrder: 0,
    totalProcessingOrder: 0,
    totalDeliveredOrder: 0,
    weeklySaleReport: [],
  },
  dashboardRecentOrder: [],
  dashboardCount: {
    totalOrder: 0,
    totalPendingOrder: 0,
    totalProcessingOrder: 0,
    totalDeliveredOrder: 0,
  },
  loading: false,
  error: null,
  totalDoc: 0,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDERS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalDoc: action.payload.totalDoc || action.payload.orders.length,
      };
    case "FETCH_DASHBOARD_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orderOverview: action.payload,
      };
    case "FETCH_DASHBOARD_RECENT_ORDER_SUCCESS":
      return {
          ...state,
          loading: false,
          dashboardRecentOrder: action.payload.orders, // Assuming structure
      };
    case "FETCH_DASHBOARD_COUNT_SUCCESS":
        return {
            ...state,
            loading: false,
            dashboardCount: action.payload,
        };
    case "FETCH_ORDERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const fetchOrders = useCallback(async ({ page = 1, limit = 8 }) => {
    dispatch({ type: "FETCH_ORDERS_REQUEST" });
    try {
      const res = await OrderServices.getAllOrders({ page, limit });
      const data = res.data?.data || res.data || {};
      dispatch({
        type: "FETCH_ORDERS_SUCCESS",
        payload: { orders: data.orders || [] },
      });
    } catch (err) {
      dispatch({ type: "FETCH_ORDERS_FAIL", payload: err.message });
      notifyError(err.message);
    }
  }, []);

  const fetchDashboardCount = useCallback(async () => {
    dispatch({ type: "FETCH_ORDERS_REQUEST" });
    try {
      const res = await OrderServices.getDashboardCount();
      const data = res.data?.data || res.data || res;
      dispatch({ type: "FETCH_DASHBOARD_COUNT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ORDERS_FAIL", payload: err.message });
      notifyError(err.message);
    }
  }, []);

  const fetchOrderCustomer = useCallback(async (id, { page, limit }) => {
    dispatch({ type: "FETCH_ORDERS_REQUEST" });
    try {
      const res = await OrderServices.getOrderCustomerById(id, { page, limit });
      const data = res.data?.data || res.data || {};
      dispatch({
        type: "FETCH_ORDERS_SUCCESS",
        payload: {
          orders: data.orders || [],
          totalDoc: data.totalDoc || 0,
        },
      });
    } catch (err) {
      dispatch({ type: "FETCH_ORDERS_FAIL", payload: err.message });
    }
  }, []);

  const fetchUserDashboardStats = useCallback(async (id) => {
    dispatch({ type: "FETCH_ORDERS_REQUEST" });
    try {
      const res = await OrderServices.getUserDashboardStats(id);
      const data = res.data?.data || res.data || {};
      dispatch({ type: "FETCH_DASHBOARD_COUNT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ORDERS_FAIL", payload: err.message });
    }
  }, []);

  const value = useMemo(() => ({
    state,
    dispatch,
    fetchOrders,
    fetchDashboardCount,
    fetchOrderCustomer,
    fetchUserDashboardStats,
  }), [state, fetchOrders, fetchDashboardCount, fetchOrderCustomer, fetchUserDashboardStats]);

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
    return useContext(OrderContext);
};

export default OrderContext;
