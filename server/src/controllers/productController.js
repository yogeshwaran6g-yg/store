const Product = require("../model/productModel");
const category = require("../model/categoryModel");

const mongoose = require("mongoose");
const { rtnRes, log } = require("../utils/helper");

/* --------------------------------
   ADD SINGLE PRODUCT
-------------------------------- */
const addProduct = async (req, res) => {
  try {
    const images = (req.files || []).map(
      file => `/uploads/${file.filename}`
    );

    const prices =
      typeof req.body.prices === "string"
        ? JSON.parse(req.body.prices)
        : req.body.prices;

    const product = new Product({
      ...req.body,
      stock: Number(req.body.stock),
      prices,
      images,
    });

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

const fs = require("fs").promises;
const path = require("path");

const deleteFiles = async (imagePaths) => {
  if (!imagePaths || imagePaths.length === 0) return;
  
  for (const imgPath of imagePaths) {
    try {
      // imgPath is like "/uploads/filename.jpg"
      // We need absolute path. The uploads dir is in server/uploads
      // Assuming this file is in server/src/controllers
      const absolutePath = path.join(__dirname, "../..", imgPath);
      await fs.unlink(absolutePath);
      log(`Deleted file: ${absolutePath}`, "info");
    } catch (err) {
      log(`Failed to delete file: ${imgPath}`, "warn", err.message);
    }
  }
};

/* --------------------------------
   UPDATE PRODUCT
-------------------------------- */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return rtnRes(res, 400, "Invalid product ID");
    }

    const product = await Product.findById(id);
    if (!product) {
      return rtnRes(res, 404, "Product not found");
    }

    // 1. Parse existing images from body
    let existingImages = [];
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }

    // Identify images to delete (those in product.images but not in existingImages)
    const imagesToDelete = product.images.filter(img => !existingImages.includes(img));
    await deleteFiles(imagesToDelete);

    // 2. New uploaded images
    const newImages = (req.files || []).map(
      file => `/uploads/${file.filename}`
    );

    // 3. Merge images
    req.body.images = [...existingImages, ...newImages];

    // 4. Parse prices
    if (typeof req.body.prices === "string") {
      req.body.prices = JSON.parse(req.body.prices);
    }

    // 5. Normalize numbers
    if (req.body.stock) {
      req.body.stock = Number(req.body.stock);
    }

    // 6. Assign allowed fields only (security)
    const allowedFields = [
      "title",
      "slug",
      "categoryId",
      "description",
      "status",
      "stock",
      "prices",
      "images",
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

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
    const product = await Product.findById(req.params.id);
    if (product) {
        await deleteFiles(product.images);
        await Product.deleteOne({ _id: req.params.id });
    }

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
    const products = await Product.find({ _id: { $in: req.body.ids } });
    for (const prod of products) {
        await deleteFiles(prod.images);
    }
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
