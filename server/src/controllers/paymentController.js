const Order = require("../model/orderModel");
const Payment = require("../model/paymentModel");
const { rtnRes, log } = require("../utils/helper");
const { Cashfree } = require("cashfree-pg");
const rawBodyParser = require("raw-body")
const crypto = require("crypto");


const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? Cashfree.PRODUCTION
    : Cashfree.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

function verifyCashfreeSignature(rawBody, signature, timestamp, secret) {
  // Cashfree concatenates timestamp + raw payload
  const signedPayload = timestamp + rawBody;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("base64");

  return expectedSignature === signature;
}

 
const createPaymentSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    // 1. Validate order
    const order = await Order.findById(orderId);
    if (!order) {
      return rtnRes(res, 404, "Order not found");
    }

    if (order.paymentStatus === "PAID") {
      return rtnRes(res, 400, "Order already paid");
    }

    // 2. Create Cashfree order
    const cfRequest = {
      order_id: `CF_${order.invoice}_${Date.now()}`,
      order_amount: order.total,
      order_currency: "INR",
      customer_details: {
        customer_id: order.user.toString(),
        customer_name: order.user_info?.name || "Test User",
        customer_email: order.user_info?.email || "test@example.com",
        customer_phone: order.user_info?.contact || "9999999999",
      },      
      order_meta: {
        return_url: "https://yourdomain.com/payment/status?order_id={order_id}"
      }
    };

    const cfResponse = await cashfree.PGCreateOrder(cfRequest);

    // 3. Save payment record
    const payment = await Payment.create({
      order: order._id,
      gateway: "Cashfree",
      amount: order.total,
      currency: "INR",
      gatewayOrderId: cfResponse.data.order_id,
      paymentSessionId: cfResponse.data.payment_session_id,
      status: "PENDING",
      createResponse: cfResponse.data,
    });

    // 4. Return session ID to frontend
    return rtnRes(res, 200, "Payment session created", {
      paymentSessionId: payment.paymentSessionId,
      paymentId: payment._id,
    });
  } catch (err) {
    log("CreatePaymentSession Error", "error", err.response?.data || err.message);
    return rtnRes(res, 500, err.response?.data?.message || err.message);
  }
};


const handleOrderSuccess = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order || order.paymentStatus !== "PAID") return;

    // 1. Decrement Stock
    for (const item of order.cart) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    // 2. Clear Cart (userId is stored in order.user)
    await Cart.deleteOne({ userId: order.user });
    
    log("Order success processed (stock & cart)", "info", orderId);
  } catch (err) {
    log("handleOrderSuccess Error", "error", err.message);
  }
};

const verifyCashfreePayment = async (req, res) => {
  try {
    const { cfOrderId } = req.params;

    if (!cfOrderId) {
      return rtnRes(res, 400, "Cashfree order ID is required");
    }

    // 1️⃣ Fetch order from Cashfree
    const cfResponse = await cashfree.PGFetchOrder(cfOrderId);
    const cfOrder = cfResponse.data;

    if (!cfOrder) {
      return rtnRes(res, 404, "Cashfree order not found");
    }

    const {
      order_status,
      order_amount,
      order_currency,
    } = cfOrder;

    // 2️⃣ Find payment record
    const payment = await Payment.findOne({
      gatewayOrderId: cfOrderId,
    }).populate("order");

    if (!payment) {
      return rtnRes(res, 404, "Payment record not found");
    }

    // 3️⃣ Idempotency check
    if (payment.status === "SUCCESS") {
      return rtnRes(res, 200, "Payment already verified", {
        status: payment.status,
      });
    }

    // 4️⃣ Update payment + order based on status
    if (order_status === "PAID") {
      payment.status = "SUCCESS";
      payment.order.paymentStatus = "PAID";
      payment.rawResponse = cfOrder;

      payment.verifiedAt = new Date();
      // payment.order.isPaid = true;
      payment.order.paidAt = new Date();
      
      await payment.save();
      await payment.order.save();

      // NEW: Handle Stock and Cart
      await handleOrderSuccess(payment.order._id);

    } else if (order_status === "FAILED" || order_status === "EXPIRED") {
      payment.status = "FAILED";
      payment.order.paymentStatus = "FAILED";
      payment.rawVerifyResponse = cfOrder;
      await payment.save();
      await payment.order.save();
    } else {
      payment.status = "PENDING";
      await payment.save();
    }

    // 5️⃣ Response to frontend
    return rtnRes(res, 200, "Payment verification completed", {
      orderId: payment.order._id,
      cfOrderId,
      paymentStatus: payment.status,
      cashfreeStatus: order_status,
      amount: order_amount,
      currency: order_currency,
    });
  } catch (err) {
    log(
      "VerifyCashfreePayment Error",
      "error",
      err.response?.data || err.message
    );

    return rtnRes(res, 500, err.response?.data?.message || err.message);
  }
};



const updatePayment = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findById(req.params.id).populate("order");
    if (!payment) return rtnRes(res, 404, "Payment not found");

    const oldStatus = payment.status;
    payment.status = status;
    
    if (status === "SUCCESS" && oldStatus !== "SUCCESS") {
        payment.order.paymentStatus = "PAID";
        payment.order.paidAt = new Date();
        await payment.order.save();
        await handleOrderSuccess(payment.order._id);
    }

    await payment.save();
    rtnRes(res, 200, "Payment updated successfully");
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};


const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const [payments, total] = await Promise.all([
      Payment.find({})
        .sort({ createdAt: -1 })
        .populate("order", "invoice user_info")
        .skip(skip)
        .limit(pageSize),
      Payment.countDocuments({}),
    ]);

    rtnRes(res, 200, "Payments fetched successfully", {
      payments,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

module.exports = {
  createPaymentSession,
  verifyCashfreePayment,
  cashfreeWebhook,
  getAllPayments,
  updatePayment,
};

// Webhook handler
async function cashfreeWebhook(req, res) {
  try {
    const rawBody = req.body.toString("utf8");

    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];

    if (
      !verifyCashfreeSignature(
        rawBody,
        signature,
        timestamp,
        process.env.CASHFREE_CLIENT_SECRET
      )
    ) {
      return rtnRes(res, 400, "Invalid signature");
    }

    const payload = JSON.parse(rawBody);
    const { type, data } = payload;

    const gatewayOrderId = data.order.order_id;

    const payment = await Payment.findOne({
      gatewayOrderId
    }).populate("order");

    if (!payment) {
      return rtnRes(res, 404, "Payment not found");
    }

    const order = payment.order;    

    if (!order) {
      console.error("Order reference missing for payment:", payment._id);
      return rtnRes(res, 409, "Order not linked with payment");
    }

    if (payment.status === "SUCCESS") {
      return rtnRes(res, 200, "Already processed");
    }
    
    log(`Webhook Type: ${type}`, "info");

    if (type === "PAYMENT_SUCCESS_WEBHOOK") {
      payment.status = "SUCCESS";
      order.paymentStatus = "PAID";
      payment.webhookResponse = payload;
      payment.verifiedAt = new Date();
      order.paymentMethod = data.payment.payment_group;
      order.paidAt = new Date();

      await payment.save();
      await order.save();
      
      // Stock and Cart
      await handleOrderSuccess(order._id);
    } else if (type === "PAYMENT_FAILED_WEBHOOK") {
      payment.status = "FAILED";
      order.paymentStatus = "FAILED";
      payment.webhookResponse = payload;

      await payment.save();
      await order.save();
    } else if (type === "PAYMENT_USER_DROPPED_WEBHOOK") {
      order.paymentStatus = "UNPAID";
      payment.status = "ABANDONED";
      payment.webhookResponse = payload;

      await payment.save();
      await order.save();
    }

    return rtnRes(res, 200, "OK");
  } catch (err) {
    console.error("Webhook handler error:", err);
    return rtnRes(res, 500, "Server Error");
  }
}


