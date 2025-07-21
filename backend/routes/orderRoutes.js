import express from 'express';
import Order from '../models/Order.js';
import CartItem from "../models/CartItem.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    // Save order
    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      totalAmount,
      date: new Date(),
    });
    await newOrder.save();

    // 🧹 Remove ordered items from cart
    const productIds = items.map(item => item.productId);
    await CartItem.deleteMany({ userId, productId: { $in: productIds } });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Order failed", error: err.message });
  }
});

// GET all orders for a user with populated product info
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId'); // ✅ this is the key part

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

// DELETE /api/orders/:orderId
router.delete('/:orderId', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel order", error: err.message });
  }
});


export default router;
