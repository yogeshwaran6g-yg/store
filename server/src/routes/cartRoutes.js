const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use(protect); // All cart routes require authentication

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);
router.put('/update', cartController.updateCartItemQuantity);
router.get('/user/:userId', admin, cartController.getUserCartByAdmin);

module.exports = router;
