const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create", paymentController.createPaymentSession);
// Verify payment
router.get("/payment/verify/:cfOrderId",paymentController.verifyCashfreePayment);
module.exports = router;
