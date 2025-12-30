const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    gateway: {
      type: String,
      enum: ["Cashfree"],
      default: "Cashfree",
    },

    gatewayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentSessionId: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["CREATED", "PENDING", "SUCCESS", "FAILED", "ABANDONED"],
      default: "CREATED",
    },

    rawResponse: {
      type: Object, // store Cashfree response safely
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
