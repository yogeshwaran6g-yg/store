require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { log, rtnRes } = require("./utils/helper")
const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");

const app = express();
// DB CONNECT
connectDB();

// MIDDLEWARES
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ROUTES
// app.use("/api/users", userRoutes);

// 404 HANDLING
app.use((req, res) => {
  rtnRes(res,404,"Route not found")
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  log("Global Error Handler", "error", err)
  rtnRes(res,500,err.message)
});

// START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => log("Server running at port ", "info", PORT));
