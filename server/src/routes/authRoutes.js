const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { rtnRes } = require('../utils/helper');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify/:token', authController.verifyEmail);
router.post('/forget-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

router.get('/me', protect, (req, res) => rtnRes(res, 200, "You are authenticated", { user: req.user }));
router.put('/update-user', protect, authController.updateUser);
router.put('/change-password', protect, authController.changePassword);
router.post('/add-shipping-address', protect, authController.addShippingAddress);

module.exports = router;
