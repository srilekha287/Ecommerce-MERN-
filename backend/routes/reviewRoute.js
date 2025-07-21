import express from 'express';
import Review from '../models/Reviews.js';

const router = express.Router();

// GET all reviews for a product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ productId });
  res.json(reviews);
});

// POST a review
router.post('/', async (req, res) => {
  const { productId, reviewer, rating, comment } = req.body;
  if (!productId || !rating || !comment) {
    return res.status(400).json({ message: "Incomplete review" });
  }

  try {
    const review = await Review.create({ productId, reviewer, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
});

export default router;
