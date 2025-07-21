import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Reviews.js';

const router = express.Router();

// GET all products
// GET /api/products?category=Jewellery&subCategory=Earrings
router.get('/', async (req, res) => {
  const { category, subCategory } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (subCategory) filter.subCategory = subCategory;

  try {
    const products = await Product.find(filter);

    // For each product, calculate avg rating
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ productId: product._id });
        const avgRating = reviews.length
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

        return {
          ...product.toObject(),
          avgRating: avgRating.toFixed(1),
        };
      })
    );

    res.json(productsWithRatings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});

// Add product (admin only)
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// Edit product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
});


export default router;
