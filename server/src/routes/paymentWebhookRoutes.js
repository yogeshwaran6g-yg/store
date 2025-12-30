const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
// Create payment session
router.post(
  "/webhook",
   express.raw({ type: "application/json" }), // MUST be here
  paymentController.cashfreeWebhook
);


module.exports=router;