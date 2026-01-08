const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/create", paymentController.createPaymentSession);
// Verify payment
router.get("/payment/verify/:cfOrderId",paymentController.verifyCashfreePayment);
router.get("/getAllPayments", protect, admin, paymentController.getAllPayments);
router.put("/:id", protect, admin, paymentController.updatePayment);
router.get("/getPaymentByOrderId/:id", protect, admin, paymentController.getPaymentByOrderId);
module.exports = router;
