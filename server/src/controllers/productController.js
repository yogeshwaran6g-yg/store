const Product = require("../model/productModel");
const category = require("../model/categoryModel");

const mongoose = require("mongoose");
const { rtnRes, log } = require("../utils/helper");

/* --------------------------------
   ADD SINGLE PRODUCT
-------------------------------- */
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    log("Product created", "info", product._id);
    return rtnRes(res, 201, "Product created successfully", product);
  } catch (err) {
    log("Add product failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   ADD MULTIPLE PRODUCTS
-------------------------------- */
const addAllProducts = async (req, res) => {
  try {
    await Product.insertMany(req.body, { ordered: false });

    log("Bulk product insert success", "info", req.body.length);
    return rtnRes(res, 201, "Products added successfully");
  } catch (err) {
    log("Bulk product insert failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   GET ALL PRODUCTS (FILTER + PAGINATION)
-------------------------------- */
const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      price,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};
    const sort = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.categoryId = category;
    }

    if (status) {
      query.status = status;
    }

    if (price === "low") sort["prices.price"] = 1;
    if (price === "high") sort["prices.price"] = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("categoryId", "_id name slug")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    return rtnRes(res, 200, "Products fetched successfully", {
      products,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    log("Fetch products failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   GET PRODUCT BY SLUG
-------------------------------- */
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("categoryId", "_id name slug");

    if (!product) {
      return rtnRes(res, 404, "Product not found");
    }

    return rtnRes(res, 200, "Product fetched successfully", product);
  } catch (err) {
    log("Fetch product by slug failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   GET PRODUCT BY ID
-------------------------------- */
const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return rtnRes(res, 400, "Invalid product ID");
    }

    const product = await Product.findById(req.params.id)
      .populate("categoryId", "_id name slug");

    if (!product) {
      return rtnRes(res, 404, "Product not found");
    }

    return rtnRes(res, 200, "Product fetched successfully", product);
  } catch (err) {
    log("Fetch product by id failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   UPDATE PRODUCT
-------------------------------- */
const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return rtnRes(res, 400, "Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return rtnRes(res, 404, "Product not found");
    }

    Object.assign(product, req.body);
    await product.save();

    log("Product updated", "info", product._id);
    return rtnRes(res, 200, "Product updated successfully", product);
  } catch (err) {
    log("Update product failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   UPDATE PRODUCT STATUS
-------------------------------- */
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await Product.updateOne(
      { _id: req.params.id },
      { $set: { status } }
    );

    log("Product status updated", "info", { id: req.params.id, status });
    return rtnRes(res, 200, `Product status updated to ${status}`);
  } catch (err) {
    log("Update status failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   DELETE SINGLE PRODUCT
-------------------------------- */
const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });

    log("Product deleted", "info", req.params.id);
    return rtnRes(res, 200, "Product deleted successfully");
  } catch (err) {
    log("Delete product failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

/* --------------------------------
   DELETE MULTIPLE PRODUCTS
-------------------------------- */
const deleteManyProducts = async (req, res) => {
  try {
    await Product.deleteMany({ _id: { $in: req.body.ids } });

    log("Multiple products deleted", "info", req.body.ids);
    return rtnRes(res, 200, "Products deleted successfully");
  } catch (err) {
    log("Delete many products failed", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getProductBySlug,
  getProductById,
  updateProduct,
  updateStatus,
  deleteProduct,
  deleteManyProducts,
};
