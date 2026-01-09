import { useState } from "react";
import { useCartContext } from "../components/context/CartContext";
import OrderServices from "../services/OrderServices";
import PaymentService from "../services/PaymentService";

const useCheckout = () => {
  const { cartState, dispatch } = useCartContext(); // Assuming you might want to clear cart later
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async ({shippingOption =  "EXPRESS", user_info}) => {
    setLoading(true);
    setError(null);

    try {
      if (cartState.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // 1. Prepare Order Payload
      

      const payload = {        
         user_info,
         shippingOption
      };

      // 2. Create Order
      const orderRes = await OrderServices.addOrder(payload);
      const createdOrder = orderRes.data; 
      const orderId = createdOrder.orderId || createdOrder.data?.orderId || createdOrder.order?.orderId; 
      
      
      if (!orderId) {
          throw new Error("Failed to retrieve Order ID");
      }

      // 3. Create Payment Session
      const paymentRes = await PaymentService.createPaymentSession({
        orderId: orderId,
      });
      
      const { paymentSessionId, checkoutUrl, status } = paymentRes.data.data || paymentRes.data;

      // 4. Handle Payment Redirection/Popup
      // If server returned a direct checkout URL
    //   if (checkoutUrl) {
    //     window.open(checkoutUrl, "_blank");
    //     setLoading(false);
    //     return { success: true, method: "url", url: checkoutUrl };
    //   }

      if (!paymentSessionId) {
        throw new Error("Payment session not created");
      }

      // Cashfree SDK
      if (!window.Cashfree) {
        throw new Error("Cashfree SDK not available");
      }

      const cashfree = new window.Cashfree({
        mode: "sandbox", // Make this configurable if needed
      });

      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });
      
      setLoading(false);
      return { success: true, method: "modal", paymentSessionId };

    } catch (err) {
      console.error("Checkout Error:", err);
      setError(err.message || "An error occurred during checkout");
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    handleCheckout,
    loading,
    error,
  };
};

export default useCheckout;
