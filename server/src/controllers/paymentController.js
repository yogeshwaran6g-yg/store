const Order = require("../model/orderModel");
const Payment = require("../model/paymentModel");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
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
        return_url: `${process.env.PRODUCT_CLIENT_URL}/payment/status?order_id={order_id}`
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
      status: "CREATED",
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

const handleOrdersCart= async (orderId)=>{
  try{  
    const order = await Order.findById(orderId);
    if (!order || order.cartProcessed) return;
    
    console.log(`Processing Cart Clearing for Order: ${orderId}, User: ${order.user}`);

    //reduce cart
    const deletedCart = await Cart.findOneAndDelete({ userId: order.user });
    log("cart","info",deletedCart)
    if (deletedCart) {
        console.log(`Cart cleared for user ${order.user}.`);
    } else {
        console.log(`Cart not found or already cleared for user ${order.user}.`);
    }

    // 2 Mark as processed (VERY IMPORTANT)
    order.cartProcessed = true;
    await order.save();

  }catch(err){
    log("err from handleordersCart :","info", err)
    console.error("Error from handleOrdersCart:", err);
    throw new Error("Unable to process the cart Internal Error");
    
  }
}

const handleOrdersStockReduce = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order || order.stockProcessed) return;

  for (const item of order.cart) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  order.stockProcessed = true;
  await order.save();
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
        await handleOrdersStockReduce(payment.order._id);
        await handleOrdersCart(payment.order._id);
    }

    await payment.save();
    rtnRes(res, 200, "Payment updated successfully");
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};


const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build query with optional status filter (supports comma-separated statuses or 'ALL')
    const query = {};
    if (status && String(status).toUpperCase() !== "ALL") {
      const statuses = String(status)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (statuses.length === 1) {
        query.status = statuses[0];
      } else if (statuses.length > 1) {
        query.status = { $in: statuses };
      }
    }

    const [payments, total] = await Promise.all([
      Payment.find(query)
        .sort({ createdAt: -1 })
        .populate("order", "invoice user_info")
        .skip(skip)
        .limit(pageSize),
      Payment.countDocuments(query),
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

const getPaymentByOrderId = async (req, res) => {
  try {
    const { id:orderId } = req.params;    
    const payment = await Payment.findOne({ order: orderId }).populate("order");
    console.log(payment);
    if (!payment) {
      return rtnRes(res, 404, "Payment not found for this order");
    }

    rtnRes(res, 200, "Payment fetched successfully", payment);
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};


const verifyPayment = async (req, res) => {
  try {
    const { id: gatewayOrderId } = req.params;
    
    // We are looking up by the Gateway Order ID provided in the return URL
    // e.g., CF_INV-123_173645...
    const payment = await Payment.findOne({ gatewayOrderId }).populate("order");

    if (!payment) {
      return rtnRes(res, 404, "Payment record not found");
    }

    const order = payment.order;
    
    // If successful, we return success
    // The frontend can then decide to clear cart etc.
    // Note: The actual status update happens via Webhook usually.
    // But if webhook is slow, checking here confirms the record exists.
    // Real-time verification with Cashfree API could be added here if needed,
    // but for now we trust our DB or just return what we have.

    rtnRes(res, 200, "Payment verification status", {
      status: payment.status,
      paymentStatus: order.paymentStatus,
      orderId: order._id
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

// Webhook handler
async function cashfreeWebhook(req, res) {
  try {
    const rawBody = req.body.toString("utf8");

    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];
    console.log(req)
    if (
      !verifyCashfreeSignature(
        rawBody,
        signature,
        timestamp,
        process.env.CASHFREE_CLIENT_SECRET
      )
    ) {
      console.error("Webhook Signature Verification Failed");
      return rtnRes(res, 400, "Invalid signature");
    }

    const payload = JSON.parse(rawBody);
    const { type, data } = payload;

    const gatewayOrderId = data.order.order_id;
    console.log(`Webhook Received: ${type} for Order: ${gatewayOrderId}`);

    const payment = await Payment.findOne({
      gatewayOrderId
    }).populate("order");

    if (!payment) {
      console.error(`Payment not found for gatewayOrderId: ${gatewayOrderId}`);
      return rtnRes(res, 404, "Payment not found");
    }

    const order = payment.order;    

    if (!order) {
      console.error("Order reference missing for payment:", payment._id);
      return rtnRes(res, 409, "Order not linked with payment");
    }

    // Idempotency check: If already SUCCESS, just return OK (but maybe ensure cart is cleared?)
    if (payment.status === "SUCCESS") {
         console.log("Payment already marked SUCCESS. Ensuring cart/stock processed.");
         // Ensure these run even if previously processed, to be safe (idempotent)
         if (!order.cartProcessed) await handleOrdersCart(order._id);
         if (!order.stockProcessed) await handleOrdersStockReduce(order._id);
         return rtnRes(res, 200, "Already processed");
    }

    if (type === "PAYMENT_SUCCESS_WEBHOOK") {
      payment.status = "SUCCESS";
      payment.webhookResponse = payload;
      payment.verifiedAt = new Date();
      
      order.paymentStatus = "PAID";      
      order.status = "PROCESSING";      
      order.paymentMethod = data.payment.payment_group || "Cashfree";
      order.paidAt = new Date();
      
      await payment.save();
      await order.save();
      
      console.log("Payment and Order saved. Processing Cart and Stock...");

      try {
          await handleOrdersCart(order._id);
      } catch (e) {
          console.error("Failed to process cart in webhook:", e);
      }
      
      try {
          await handleOrdersStockReduce(order._id);
      } catch (e) {
          console.error("Failed to process stock in webhook:", e);
      }
      
    }else if (type === "PAYMENT_FAILED_WEBHOOK") {
      payment.status = "FAILED";
      order.paymentStatus = "FAILED";
      payment.webhookResponse = payload;
      order.status = "CANCELED";
      await payment.save();
      await order.save();
    } else if (type === "PAYMENT_USER_DROPPED_WEBHOOK") {
      payment.status = "ABANDONED";
      order.paymentStatus = "FAILED";      
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


module.exports = {
  createPaymentSession,//using

  cashfreeWebhook,//using
  getAllPayments,//using
  updatePayment,//using
  getPaymentByOrderId, //using
  verifyPayment //using
};
