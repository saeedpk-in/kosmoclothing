import mongoose, { Document, models, ObjectId, Schema } from "mongoose";

interface Order extends Document {
  email?: string;
  mobile: string;
  customerName: string;
  address: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: "COD" | "online-payment";
  status: "confirmed" | "dispatched" | "shipped" |"out of delivery" | "delivered";
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  totalAmount: number;
  userId: string | null;
  createdAt:Date
  deliveredAt: Date
}

const orderSchema = new Schema<Order>({
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  email: { type: String, required: true, },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  userId: { type: String, required: false, default:null },
  paymentMethod: {
    type: String,
    enum: ["COD", "online-payment"],
    required: true,
  },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "XXXL"] },
    },
  ],
  status:{
    type: String,
    enum: ["confirmed", "dispatched" , "shipped" ,"out of delivery" ,  "delivered"],
    required: true,
  },
  deliveredAt:  { type: Date, default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
  createdAt: { type: Date, default: Date.now },
});


const Orders =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);

export default Orders;
