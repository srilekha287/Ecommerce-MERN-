import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    pincode: String,
  },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
