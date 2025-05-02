"use server"
import { connectToDatabase } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Products from "@/models/Products";
import User from "@/models/User";
import { Size } from "@/types";
// import { CartItem } from "@/types";


// Action to handle adding or updating items in the cart
export async function addItemToCart({ cartId , userId , productId , quantity , size }:{cartId?: string, userId?: string , productId: string, quantity: number; size:Size}) {
  try {
    await connectToDatabase()
    let cart = null;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ cartId });
    }

    if (!cart) {
      cart = new Cart({
        userId: userId || null,
        cartId: cartId || Math.random().toString(36).substring(2, 15),
        items: [{ productId, quantity , size}],
      });
      await cart.save();
    } else {
      const existingItem = cart.items.find((item: any) => item.productId === productId && item.size === size);
      if (existingItem) {
        if (existingItem.quantity === 1 && quantity === -1) {
          cart.items = cart.items.filter((item: any) => item.productId !== productId);
        } else {
          existingItem.quantity += quantity;
        }
      } else {
        cart.items.push({ productId, quantity , size});
      }
      await cart.save();
    }

    return { success: true, cart:JSON.parse(JSON.stringify(cart)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Action to handle fetching the cart details
export async function getCart({ cartId , userId }:{cartId?: string | null, userId?: string | null}) {
  try {
    await connectToDatabase()
    const cart = await Cart.findOne(userId ? { userId } : { cartId });
    if (!cart) {
      return { success: true, items: [], cartTotal: 0 };
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (item: any) => {
        const product = await Products.findById(item.productId);
        return {
          productId: item.productId,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.images[0],
          size: item.size,
          total: (product?.price || 0) * item.quantity,
        };
      })
    );

    const cartTotal = populatedItems.reduce((total, item) => total + item.total, 0);

    return { success: true, items: populatedItems, cartTotal };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Action to handle removing an item from the cart
export async function removeItemFromCart({ cartId , userId , productId , size }:{cartId?: string, userId?: string | null, productId: string; size:Size}) {
  try {
    await connectToDatabase()
    const cart = await Cart.findOne(userId ? { userId } : { cartId });
    if (!cart) {
      return { success: true };
    }

    cart.items = cart.items.filter((item: any) => !(item.productId === productId && item.size === size));

    await cart.save();

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

//


// Action to handle emptying the cart
export async function emptyCart({ cartId, userId }: { cartId?: string, userId?: string | null }) {
  try {
    await connectToDatabase();
    const cart = await Cart.findOne(userId ? { userId } : { cartId });
    if (!cart) {
      return { success: true };
    }

    cart.items = [];
    await cart.save();

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}