const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware")
// add order
router.post("/create", protect,orderController.createOrderFromCart);

// get all orders
router.get("/getAllOrders", protect, admin, orderController.getAllOrders);

// get order by id
router.get("/:id", orderController.getOrderById);

// get order by customer id
router.get("/customer/:id", orderController.getOrderCustomer);

// update order
router.put("/:id", orderController.updateOrder);

// delete order
router.delete("/:id", orderController.deleteOrder);

// dashboard count
router.get("/dashboard/count", orderController.getDashboardCount);

// dashboard amount
router.get("/dashboard/amount", orderController.getDashboardAmount);

// best seller product chart
router.get("/dashboard/best-seller-chart", orderController.getBestSellerProductChart);

// dashboard orders
router.get("/dashboard/orders", orderController.getDashboardOrders);

// dashboard recent order
router.get("/dashboard/recent-order", orderController.getDashboardRecentOrder);

router.get("/dashboard/stats/:id", orderController.getUserDashboardStats);

module.exports = router;
