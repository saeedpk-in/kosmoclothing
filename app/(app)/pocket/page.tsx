"use client";
import { addItemToCart, getCart, removeItemFromCart } from "@/actions/cart";
import CheckOutForm from "@/components/forms/CheckOutForm";
import { CartItemSkelton } from "@/components/Skeltons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cart, ICartItem, Size } from "@/types";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCartIcon,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false);

  useEffect(() => {
    localStorage.removeItem("cart-reminder");
    window.dispatchEvent(new Event("cartReminderChanged"));
  }, []);
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

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      localStorage.removeItem("cartId");
      setIsSessionLoaded(true);
    } else {
      const storedCartId = localStorage.getItem("cartId");
      if (!storedCartId) {
        const newCartId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("cartId", newCartId);
        setCartId(newCartId);
      } else {
        setCartId(storedCartId);
      }
    }
  }, [session, status]);

  useEffect(() => {
    if (cartId || isSessionLoaded) {
      fetchCart();
    }
  }, [cartId, isSessionLoaded]);

  const calculateCartTotal = (items: ICartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = async (
    productId: string,
    quantity: number,
    size: Size
  ) => {
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

  const removeItem = async ({
    productId,
    size,
  }: {
    productId: string;
    size: Size;
  }) => {
    try {
      removeItemFromCart({
        productId,
        cartId,
        userId: session?.user?.id,
        size,
      });
      const updatedItems =
        cart?.items.filter(
          (item) => !(item.productId === productId && item.size === size)
        ) || [];
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

  return (
    <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 min-h-screen">
      <h2 className="text-4xl tracking-tight font-extrabold my-5">
        Your Pocket
      </h2>
      {!session?.user && (
        <div className="p-5 rounded-xl bg-gray-900/5 text-sm mb-5 w-fit flex">
          <p>You are not logged in. Please log in for a better experience.</p>
          <Link href="/login" className="ml-2 hover:underline">
            Login Now
          </Link>
        </div>
      )}
      <div className=" flex flex-col lg:flex-row gap-6 ">
        <div className="w-full lg:w-1/2 order-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-900 rounded-lg ">
          <div className="mb-4">
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {cart?.items?.length ? (
              <div>
                <ul className="space-y-4">
                  {cart.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-start gap-4 p-3 shadow rounded-lg"
                    >
                      <div className="flex gap-3 relative">
                        <button
                          onClick={() =>
                            removeItem({
                              productId: item.productId,
                              size: item.size,
                            })
                          }
                          className="absolute -top-2 -left-2 cursor-pointer z-10"
                          aria-label="Remove item"
                        >
                          <XCircle
                            className="w-5 h-5"
                            fill="#000"
                            color="#fff"
                          />
                        </button>
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            fill
                            alt="product"
                            className="object-cover rounded-xl border"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="text-sm sm:text-base line-clamp-2">
                            {item.name}
                          </h1>
                          <Badge className=" w-fit bg-zinc-600 text-xs">
                            {item.size}
                          </Badge>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            asChild
                            className="text-xs "
                          >
                            <Link href={`/products/${item.productId}`}>
                              view product
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <h2 className="text-sm sm:text-base">
                          ₹{item.price.toFixed(2)}
                        </h2>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                -1,
                                item.size
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() =>
                              handleQuantityChange(item.productId, 1, item.size)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <h4 className="text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : loading ? (
              <CartItemSkelton />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-6 sm:p-8 py-12 sm:py-16">
                <WalletCards size={80} className="opacity-55" />
                <h1 className="text-lg font-medium">Your Pocket is empty</h1>
                <Link href="/shop">
                  <Button className="rounded-xl" size="lg" variant="outline">
                    Shop Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 order-2 lg:sticky lg:h-fit lg:top-20">
          {cart?.items?.length
            ? cart?.items?.length > 0 && (
                <div className="space-y-3 mt-6  pt-4">
                  <div className="text-sm font-semibold">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{cart.cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹0.00</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold pt-2">
                    <span>Total</span>
                    <span>₹{cart.cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full rounded-2xl" size={"lg"} asChild>
                    <Link
                      href={{
                        pathname: "/checkout",
                        query: { mode: "cart" },
                      }}
                    >
                      Continue to Checkout
                    </Link>
                  </Button>
                  <Button
                    className="w-full rounded-2xl"
                    size={"lg"}
                    asChild
                    variant={"outline"}
                  >
                    <Link href="/shop">Collect more</Link>
                  </Button>
                </div>
              )
            : null}
        </div>
      </div>
    </div>
  );
};



export default CartPage;
