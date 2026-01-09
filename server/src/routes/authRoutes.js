const express = require('express');
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const { rtnRes } = require('../utils/helper');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/resend-otp', authController.resendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/me', protect, (req, res) => rtnRes(res, 200, "You are authenticated", { user: req.user }));
router.put('/updateUser', protect, authController.updateUser);
router.put('/changePassword', protect, authController.changePassword);
router.post('/addShippingAddress', protect, authController.addShippingAddress);

router.get('/getAllUsers', protect, admin, authController.getAllUsers);
router.get('/:id', protect, admin, authController.getUserById);
router.put('/:id/block', protect, admin, authController.blockUser);

module.exports = router;
