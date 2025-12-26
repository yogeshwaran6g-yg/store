require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const Product = require("../model/productModel");
const Category = require("../model/categoryModel");

const { buildProducts, Categories } = require("./MocData");

const {
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  CLEAR_CATEGORIES,
  CLEAR_PRODUCTS,
} = process.env;

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    /* ---------- CATEGORY SEED ---------- */
    let categoryMap = {};

    if (SEED_CATEGORIES === "true") {
      if (CLEAR_CATEGORIES === "true") {
        console.log("🗑️ Clearing categories...");
        await Category.deleteMany();
      }

      console.log("📂 Seeding categories...");
      const inserted = await Category.insertMany(Categories, {
        ordered: false,
      });

      inserted.forEach((cat) => {
        categoryMap[cat.slug] = cat._id;
        console.log(`✔ Category: ${cat.name}`);
      });
    } else {
      // Fetch existing categories
      const existing = await Category.find();
      existing.forEach((cat) => {
        categoryMap[cat.slug] = cat._id;
      });
    }

    /* ---------- PRODUCT SEED ---------- */
    if (SEED_PRODUCTS === "true") {
      if (CLEAR_PRODUCTS === "true") {
        console.log("🗑️ Clearing products...");
        await Product.deleteMany();
      }

      console.log("📦 Building products...");
      const products = buildProducts(categoryMap);

      console.log("📦 Seeding products...");
      await Product.insertMany(products, { ordered: false });
    }

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
