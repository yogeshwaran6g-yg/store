const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    /* ---------------- IDENTIFIERS ---------------- */
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    /* ---------------- BASIC INFO ---------------- */
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
    },

    /* ---------------- CATEGORY ---------------- */
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    /* ---------------- TAGS ---------------- */
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    /* ---------------- PRICING ---------------- */
    prices: {
      originalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    /* ---------------- INVENTORY ---------------- */
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ---------------- MEDIA ---------------- */
    images: [
      {
        type: String,
      },
    ],

    /* ---------------- STATUS ---------------- */
    status: {
      type: String,
      enum: ["ACTIVE", "OUT_OF_STOCK", "INACTIVE"],
      default: "ACTIVE",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);