require("dotenv").config();
const express = require("express");
const path = require("path");
const ngrok = require('@ngrok/ngrok');
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { log, rtnRes } = require("./utils/helper")
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
const app = express();
// DB CONNECT
connectDB();
// MIDDLEWARES
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan("dev"));
// ROUTES
// 🔥 Webhook FIRST — before express.json()
app.use("/api/health",(req,res)=>{
  res.send("working good")
})
app.use(
  "/api/v1/payment",
  require("./routes/paymentWebhookRoutes")
);

app.use(express.json({ limit: "10mb" }));
app.use("/api/v1/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/v1/product",require("./routes/productRoute"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));
app.use("/api/v1/payment", require("./routes/paymentRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));


// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
// ngrok.connect({ addr: PORT, authtoken_from_env: true })
// 	.then(listener => console.log(`Ingress established at: ${listener.url()}`));
// NGROK_AUTHTOKEN=37YSQcwfsnmRlMZZ4dH4jied0uq_32csHefKN1xNRquFrhdJf node src/server.js
//  ngrok config add-authtoken 37YSQcwfsnmRlMZZ4dH4jied0uq_32csHefKN1xNRquFrhdJf


//ngrok http 4000 --subdomain mysecondtunnel
