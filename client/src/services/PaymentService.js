import {api} from "../util/axios";



const verifyCashfreePayment = async (cfOrderId) => {
  if (!cfOrderId) {
    throw new Error("Cashfree Order ID is required for verification");
  }

  try {
    const response = await api.get(`/api/v1/payment/verify/${cfOrderId}`,
      {
        withCredentials: true, // if you use cookies / auth
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
  verifyCashfreePayment,
  createPaymentSession,
};
