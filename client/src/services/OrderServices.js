import { api } from "../util/axios";

// const BASE_PATH_URL = "/api/v1/order";

const OrderServices = {
  addOrder: (body) => {
    return api.post("/api/v1/order/add", body);
  },
  
  createPaymentIntent: (body) => {
    return api.post("/api/v1/order/create-payment-intent", body); // Adjust endpoint if needed
  },

  getAllOrders: ({ page, limit, customerName, status, day, startDate, endDate }) => {
    return api.get("/api/v1/order", {
      params: {
        page,
        limit,
        customerName,
        status,
        day,
        startDate,
        endDate,
      },
    });
  },

  getOrderCustomer: ({ page, limit }) => {
     // This method is now effectively replaced by getOrderCustomerById 
     // which takes an explicit customer ID.
     return api.get(`/api/v1/order/customer`, { 
         params: { page, limit } 
     });
  },
  
  getOrderCustomerById: (id, {page, limit}) => {
      return api.get(`/api/v1/order/customer/${id}`, {
          params: { page, limit }
      });
  },

  getOrderById: (id) => {
    return api.get(`/api/v1/order/${id}`);
  },

  updateOrder: (id, body) => {
    return api.put(`/api/v1/order/${id}`, body);
  },

  deleteOrder: (id) => {
    return api.delete(`/api/v1/order/${id}`);
  },
  
  getDashboardCount: () => {
      return api.get("/api/v1/order/dashboard/count");
  },
  
  getDashboardAmount: () => {
      return api.get("/api/v1/order/dashboard/amount");
  },
  
  getBestSellerProductChart: () => {
      return api.get("/api/v1/order/dashboard/best-seller-chart");
  },
  
  getDashboardOrders: ({ page, limit }) => {
      return api.get("/api/v1/order/dashboard/orders", {
          params: { page, limit }
      });
  },
  
  getDashboardRecentOrder: ({ page, limit }) => {
      return api.get("/api/v1/order/dashboard/recent-order", {
          params: { page, limit }
      });
  },

  getUserDashboardStats: (id) => {
    return api.get(`/api/v1/order/dashboard/stats/${id}`);
  },
};

export default OrderServices;
