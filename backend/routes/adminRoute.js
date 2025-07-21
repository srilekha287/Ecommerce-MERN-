// backend/routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.find();
  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  res.json({ users, products, orders: orders.length, revenue });
});

export default router;
