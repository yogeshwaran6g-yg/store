import {api} from "../util/axios";



const verifyPayment = async (gatewayOrderId) => {
  if (!gatewayOrderId) {
    throw new Error("Gateway Order ID is required for verification");
  }

  try {
    const response = await api.get(`/api/v1/payment/verify/${gatewayOrderId}`,
      {
        withCredentials: true, 
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Payment verification failed";
    throw new Error(message);
  }
};

const createPaymentSession = async (data) => {
  return await api.post("/api/v1/payment/create", data);
};

export default {
  verifyPayment,
  createPaymentSession,
};
