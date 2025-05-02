import { ObjectId } from "mongoose";
import { z } from "zod";

export type Size = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

interface IProduct {
  _id?: string;
  name: string;
  category: string;
  inStock: boolean;
  images: string[];
  price: number;
  description: string;
  sizes: Size[];
  trending: boolean;
}

interface IOrderItem {
  productId: string;
  size: Size;
  quantity: number;
  price?: number;
  image?: string;
  total?: number;
  name?: string;
}

interface IOrder {
  _id?: string;
  email?: string;
  mobile: string;
  customerName: string;
  address: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: "COD" | "online-payment";
  products: IOrderItem[];
  userId?:string | null;
  totalAmount:number;
  createdAt?:Date;
  deliveredAt?:Date;
  status: "confirmed" | "dispatched" | "shipped" | "out of delivery" | "delivered";
}

interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
  size: Size;
}
type Cart = {
  items: ICartItem[];
  cartTotal: number;
};




export type { IProduct, ICartItem, Cart, IOrder, IOrderItem };
