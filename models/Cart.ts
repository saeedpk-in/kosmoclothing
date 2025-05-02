import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "XXXL"] }
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // For logged-in users
  cartId: { type: String, required: true, unique: true }, // For guests
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now },
});
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
