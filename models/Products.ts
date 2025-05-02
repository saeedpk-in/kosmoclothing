import mongoose, { Document, Schema } from 'mongoose';

interface Product extends Document {
  name: string;
  category: string;
  inStock: boolean;
  images: string[];
  price: number;
  description: string;
  sizes:  ("S" | "M" | "L" | "XL" |"XXL" | "XXXL")[];
  trending: boolean;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  sizes: { 
    type: [{ type: String, enum: ["S", "M", "L", "XL", "XXL", "XXXL"] }], 
    required: true 
  },
  trending: { type: Boolean, required: false, default: undefined }
});

const Products = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);

export default Products;
