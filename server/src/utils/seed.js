require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const Order = require("../model/orderModel");

const { buildProducts, Categories, buildOrders } = require("./MocData");

const {
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  CLEAR_CATEGORIES,
  CLEAR_PRODUCTS,
} = process.env;

const {
  SEED_USERS,
  CLEAR_USERS,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD,
  SEED_ORDERS,
  CLEAR_ORDERS,
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

    /* ---------- USER SEED ---------- */
    if (SEED_USERS === "true") {
      if (CLEAR_USERS === "true") {
        console.log("🗑️ Clearing users...");
        await User.deleteMany();
      }

      console.log("👤 Seeding users...");

      const users = [
        {
          username: "admin",
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          role: "admin",
          isEmailVerified: true,
        },
        {
          username: "testuser",
          email: USER_EMAIL,
          password: USER_PASSWORD,
          role: "user",
          isEmailVerified: true,
        },
      ];

      for (const userData of users) {
        const exists = await User.findOne({ email: userData.email });

        if (!exists) {
          await User.create(userData);
          console.log(`✔ User created: ${userData.email}`);
        } else {
          console.log(`⚠ User exists: ${userData.email}`);
        }
      }
    }

    /* ---------- ORDER SEED ---------- */
    if (SEED_ORDERS === "true") {
      if (CLEAR_ORDERS === "true") {
        console.log("🗑️ Clearing orders...");
        await Order.deleteMany();
      }

      console.log("🛒 Collecting maps for orders...");
      const users = await User.find();
      const userMap = {};
      users.forEach((u) => {
        userMap[u.email] = u._id;
      });

      const products = await Product.find();
      const productMap = {};
      products.forEach((p) => {
        productMap[p.sku] = p._id;
      });

      console.log("🛒 Building orders...");
      const orders = buildOrders(userMap, productMap);

      console.log("🛒 Seeding orders...");
      await Order.insertMany(orders);
      console.log(`✅ Seeded ${orders.length} orders.`);
    }

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
