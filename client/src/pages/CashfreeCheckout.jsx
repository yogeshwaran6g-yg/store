import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CashfreeCheckout = () => {
  const { orderId } = useParams(); // ✅ CORRECT

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/v1/payment/create", {
        orderId,
      });

      const { paymentSessionId, checkoutUrl, status } = res.data.data;

      // If server returned a direct checkout URL (payment link), use it
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
        console.log("Redirecting to checkout URL", checkoutUrl, "status:", status);
        return;
      }

      if (!paymentSessionId) {
        alert("Payment session not created");
        return;
      }

      // Cashfree SDK (loaded globally)
      if (!window.Cashfree) {
        alert("Cashfree SDK not available; please try the checkout link.");
        return;
      }

      const cashfree = new window.Cashfree({
        mode: "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      console.log("cashfree opened", paymentSessionId);
    } catch (err) {
      console.error(err);
      alert("Payment failed to start");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-6 py-3 bg-green-600 text-white rounded"
    >
      Pay Now
    </button>
  );
};

export default CashfreeCheckout;
