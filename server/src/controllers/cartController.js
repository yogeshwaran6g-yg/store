const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const { rtnRes } = require("../utils/helper");

exports.getCart = async (req, res) => { 
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.product",
      "title prices images slug"
    );

    if (!cart) {
      return rtnRes(res, 200, "Cart is empty", { items: [] });
    }

    rtnRes(res, 200, "Cart retrieved successfully", cart);
  } catch (error) {
    rtnRes(res, 500, error.message);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return rtnRes(res, 404, "Product not found");
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity }],
      });
    }

    await cart.save();
    
    // Populate for response
    await cart.populate("items.product", "title prices images slug");

    rtnRes(res, 200, "Item added to cart", cart);
  } catch (error) {
    rtnRes(res, 500, error.message);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return rtnRes(res, 404, "Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    
    await cart.populate("items.product", "title prices images slug");

    rtnRes(res, 200, "Item removed from cart", cart);
  } catch (error) {
    rtnRes(res, 500, error.message);
  }
};

exports.updateCartItemQuantity = async (req, res) => { 
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        if (quantity < 1) {
             return rtnRes(res, 400, "Quantity must be at least 1");
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return rtnRes(res, 404, "Cart not found");
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return rtnRes(res, 404, "Item not found in cart");
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate("items.product", "title prices images slug");

        rtnRes(res, 200, "Cart item updated", cart);

    } catch (error) {
        rtnRes(res, 500, error.message);
    }
}


exports.clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return rtnRes(res, 404, "Cart not found");
        }

        cart.items = [];
        await cart.save();

        rtnRes(res, 200, "Cart cleared successfully", cart);
    } catch (error) {
        rtnRes(res, 500, error.message);
    }
};

exports.getUserCartByAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate(
            "items.product",
            "title prices images slug"
        );

        if (!cart) {
            return rtnRes(res, 200, "Cart is empty", { items: [] });
        }

        rtnRes(res, 200, "User cart retrieved successfully", cart);
    } catch (error) {
        rtnRes(res, 500, error.message);
    }
};
