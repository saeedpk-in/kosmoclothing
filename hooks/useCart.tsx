import { addItemToCart } from '@/actions/cart';
import { ICartItem, Size } from '@/types';
import React from 'react'

export const useCart = () => {
  return {
    cart: {
      items: [
        {
          productId: 1,
          name: "Product 1",
          price: 100,
          quantity: 1,
          imageUrl: "/path/to/image.jpg",
        },
        {
          productId: 2,
          name: "Product 2",
          price: 200,
          quantity: 2,
          imageUrl: "/path/to/image.jpg",
        },
      ],
      cartTotal: 500,
    },
    loading: false,
    error: null,
    addToCart: (product) => {
      console.log("Adding to cart:", product);
    }
    removeFromCart: (productId) => {
      console.log("Removing from cart:", productId);
    },
    updateCartItem: (productId, quantity) => {

        console.log("Updating cart item:", productId, quantity);
        },
  }
}

const fetchCart = async () => {
    setLoading(true);
    try {
      if (session?.user) {
        const response = await getCart({
          userId: session?.user?.id as string,
        });
        if (response.success) {
          setCart({
            items: response.items || [],
            cartTotal: response.cartTotal,
          });
        } else {
          setError("Failed to fetch cart data.");
        }
      } else if (cartId) {
        const response = await getCart({
          cartId: cartId,
        });
        if (response.success) {
          setCart({
            items: response.items || [],
            cartTotal: response.cartTotal,
          });
        } else {
          setError("Failed to fetch cart data.");
        }
      }
    } catch (err) {
      setError("Failed to fetch cart data.");
    } finally {
      setLoading(false);
    }
  };

  const calculateCartTotal = (items: ICartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = async (productId: string, quantity: number, size: Size) => {
    try {
      if (session?.user) {
        await addItemToCart({
          productId,
          quantity,
          userId: session.user.id,
          size,
        });
      } else if (cartId) {
        await addItemToCart({
          productId,
          quantity,
          cartId,
          size,
        });
      }

      const updatedItems =
        cart?.items.map((item) =>
          item.productId === productId && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: item.price * (item.quantity + quantity),
              }
            : item
        ) || [];

      const updatedCartTotal = calculateCartTotal(updatedItems);
      setCart({
        items: updatedItems,
        cartTotal: updatedCartTotal,
      });
    } catch (err) {
      setError("Failed to update item quantity.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async ({productId, size}: {productId:string, size:Size}) => {
    try {
      removeItemFromCart({
        productId,
        cartId,
        userId: session?.user?.id,
        size
      });
      const updatedItems =
        cart?.items.filter((item) => !(item.productId === productId && item.size === size)) || [];
      const updatedCartTotal = calculateCartTotal(updatedItems);
      setCart({
        items: updatedItems,
        cartTotal: updatedCartTotal,
      });
    } catch (err) {
      setError("Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  };