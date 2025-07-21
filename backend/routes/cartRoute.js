import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId }).populate('productId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Error loading cart', error: err.message });
  }
});
// Add item to cart
// routes/cartRoutes.js
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId,productId,quantity)

    if (!userId || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await CartItem.findOne({ userId, productId });

    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      return res.status(200).json({ message: 'Updated quantity in cart' });
    }

    const newItem = new CartItem({ userId, productId, quantity: quantity || 1 });
    await newItem.save();

    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// routes/cartRoutes.js
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});


export default router;