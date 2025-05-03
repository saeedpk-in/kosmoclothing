"use client";
import { getOrders } from "@/actions/orders";
import { IOrder } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@/components/intractive/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<(IOrder & { productsCount: number })[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let res;

        if (session?.user) {
          res = await getOrders({ userId: session.user.id });
        } else {
          const orderIds = JSON.parse(localStorage.getItem("orderIds") || "[]");
          if (orderIds && orderIds.length > 0) {
            res = await getOrders({ orderIds });
          }
        }
        if (res?.orders) {
          setOrders(res.orders);
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Your Orders</h1>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm items-center py-8">
      <h1 className="text-5xl font-extrabold  mb-8">Your Orders</h1>
      <div className="flex justify-end w-full px-10">
        <Button asChild>
          <Link href="/replacement">
           Your Replacements
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2  md:px-10">
        {orders.map((order) => (
          // <div key={order._id} className="border rounded-lg p-6 shadow-sm  ">
          //   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">

          //           <div className="rounded-lg border bg-card p-6 shadow-sm">
          //             <h2 className="mb-4 text-xl font-bold">
          //               Order Summary
          //             </h2>
          //             <div className="space-y-4">
          //               <div className="flex justify-between">
          //                 <span className="text-muted-foreground">
          //                   Order ID
          //                 </span>
          //                 <span className="font-medium">
          //                   #{order._id?.substring(0, 8)}...
          //                 </span>
          //               </div>
          //               <div className="flex justify-between">
          //                 <span className="text-muted-foreground">Date</span>
          //                 <span className="font-medium">
          //                   {order.createdAt
          //                     ? formatDate(order.createdAt)
          //                     : "N/A"}
          //                 </span>
          //               </div>
          //               <div className="flex justify-between">
          //                 <span className="text-muted-foreground">
          //                   Status
          //                 </span>
          //                 <Badge>
          //                   {order.status.charAt(0).toUpperCase() +
          //                     order.status.slice(1)}
          //                 </Badge>
          //               </div>
          //             </div>
          //           </div>

          //           {/* Payment & Shipping Card */}
          //           <div className="rounded-lg border bg-card p-6 shadow-sm">
          //             <h2 className="mb-4 text-xl font-bold">
          //               Payment & Shipping
          //             </h2>
          //             <div className="space-y-4">
          //               <div>
          //                 <h3 className="text-sm font-semibold text-muted-foreground">
          //                   Payment Method
          //                 </h3>
          //                 <p className="mt-1 font-medium">
          //                   {order.paymentMethod === "COD"
          //                     ? "Cash on Delivery"
          //                     : "Online Payment"}
          //                 </p>
          //               </div>
          //               <div>
          //                 <h3 className="text-sm font-semibold text-muted-foreground">
          //                   Payment Status
          //                 </h3>
          //                 <Badge className="mt-1">
          //                   {order.paymentMethod === "COD"
          //                     ? "Pending"
          //                     : "Paid"}
          //                 </Badge>
          //               </div>
          //               <div>
          //                 <h3 className="text-sm font-semibold text-muted-foreground">
          //                   Shipping Address
          //                 </h3>
          //                 <address className="mt-1 not-italic">
          //                   <p>{order.customerName}</p>
          //                   <p>
          //                     {order.address}, {order.street}
          //                   </p>
          //                   <p>
          //                     {order.city}, {order.state}
          //                   </p>
          //                   <p>India - {order.pinCode}</p>
          //                   <p className="mt-2">Phone: {order.mobile}</p>
          //                 </address>
          //               </div>
          //             </div>
          //           </div>

          //           {/* Total Amount Card */}
          //           <div className="rounded-lg border bg-card p-6 shadow-sm">
          //             <h2 className="mb-4 text-xl font-bold">Order Total</h2>
          //             <div className="space-y-3">
          //               <div className="flex justify-between">
          //                 <span className="text-muted-foreground">
          //                   Subtotal
          //                 </span>
          //                 <span className="font-medium">
          //                   {formatCurrency(order.totalAmount)}
          //                 </span>
          //               </div>
          //               <div className="flex justify-between">
          //                 <span className="text-muted-foreground">
          //                   Shipping
          //                 </span>
          //                 <span className="font-medium">Free</span>
          //               </div>
          //               <hr className="my-2" />
          //               <div className="flex justify-between text-lg font-bold">
          //                 <span>Total</span>
          //                 <span>{formatCurrency(order.totalAmount)}</span>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //   <div className="flex gap-3">
          //     <div className="flex flex-col gap-4 justify-center mb-6 w-1/2">
          //       <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          //         {/* <div>
          //           <h3 className="text-2xl font-extrabold uppercase">
          //             {order.status}
          //           </h3>
          //           <p className="text-muted-foreground text-sm">
          //             Ordered on {formatDate(order.createdAt)}
          //           </p>
          //           <p className="text-muted-foreground text-sm">
          //             estimated delivery on {formatDate(order.deliveredAt)}
          //           </p>
          //           <p className="text-muted-foreground">Order #</p>
          //           <p className="font-mono font-medium">{order._id}</p>
          //         </div> */}
          //         {/* <div className="bg-white shadow rounded-lg overflow-hidden">
          //       <div className="px-6 py-5 border-b border-gray-200">
          //         <h2 className="text-lg font-medium text-gray-900 flex items-center">
          //           <Truck className="mr-2 h-5 w-5" />
          //           What's Next?
          //         </h2>
          //       </div>
          //       <div className="px-6 py-5">
          //         <ul className="space-y-4">
          //           <li className="flex items-start">
          //             <div className="flex-shrink-0 h-6 w-6 ">
          //               <CheckCircle className="h-full w-full text-green-500" />
          //             </div>
          //             <p className="ml-3 text-gray-700">
          //               <span className="font-medium">Order confirmed</span> -
          //               We've received your order.
          //             </p>
          //           </li>
          //           <li className="flex items-start">
          //             <div className="flex-shrink-0 h-6 w-6 text-gray-300">
          //               { order.status === "shipped" ? (
          //                 <CheckCircle className="h-full w-full text-green-500" />
          //               ) : (
          //                 <svg
          //                   className="h-full w-full"
          //                   fill="currentColor"
          //                   viewBox="0 0 20 20"
          //                 >
          //                   <circle
          //                     cx="10"
          //                     cy="10"
          //                     r="9"
          //                     stroke="currentColor"
          //                     strokeWidth="2"
          //                     fill="none"
          //                   />
          //                 </svg>
          //               )}
          //             </div>
          //             <p className="ml-3 text-gray-700">
          //               <span className="font-medium">Shipped</span> - Your
          //               order is on its way to you.
          //             </p>
          //           </li>
          //           <li className="flex items-start">
          //             <div className="flex-shrink-0 h-6 w-6 text-gray-300">
          //               {order.status === "delivered" ? (
          //                 <CheckCircle className="h-full w-full" />
          //               ) : (
          //                 <svg
          //                   className="h-full w-full"
          //                   fill="currentColor"
          //                   viewBox="0 0 20 20"
          //                 >
          //                   <circle
          //                     cx="10"
          //                     cy="10"
          //                     r="9"
          //                     stroke="currentColor"
          //                     strokeWidth="2"
          //                     fill="none"
          //                   />
          //                 </svg>
          //               )}
          //             </div>
          //             <p className="ml-3 text-gray-700">
          //               <span className="font-medium">Delivered</span> -
          //               Expected by{" "}
          //               {new Date(
          //                 order.deliveredAt || 0
          //               ).toLocaleDateString()}
          //               .
          //             </p>
          //           </li>
          //         </ul>
          //       </div>
          //     </div> */}
          //       </div>
          //     </div>

          //     <ul className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8 h-fit w-1/2">
          //       {order.products.map((product, index) => (
          //         <li
          //           key={index}
          //           className="flex justify-between items-start gap-4 p-3 shadow border rounded-lg"
          //         >
          //           <div className="flex gap-3 relative">
          //             <Badge className="text-xs absolute -top-2 -left-2 cursor-pointer z-10 rounded-full">
          //               {product.quantity}
          //             </Badge>
          //             <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
          //               <Image
          //                 src={product.image || "/payment.png"}
          //                 fill
          //                 alt={product.name || ""}
          //                 className="object-cover rounded-xl border"
          //               />
          //             </div>
          //             <div className="flex flex-col gap-1">
          //               <Link
          //                 href={`/products/${product.productId}`}
          //                 className="text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors"
          //               >
          //                 {product.name}
          //               </Link>
          //               <Badge className="w-fit bg-zinc-600 text-xs">
          //                 {product.size}
          //               </Badge>
          //             </div>
          //           </div>
          //           <div className="flex flex-col items-end space-y-2">
          //             <div className="items-end flex flex-col">
          //               <p className="text-xs">Unit price</p>
          //               <h2 className="text-sm sm:text-base">
          //                 {formatCurrency(product.price || 0)}
          //               </h2>
          //             </div>
          //             <div className="items-end flex flex-col">
          //               <p className="text-xs">Total price</p>
          //               <h4 className="text-sm">
          //                 {formatCurrency(
          //                   (product.price || 0) * product.quantity
          //                 )}
          //               </h4>
          //             </div>
          //           </div>
          //         </li>
          //       ))}
          //     </ul>
          //   </div>

          // </div>
          <Card className="pb-0" key={order._id}>
            <CardHeader>
              <div className="flex justify-between">
                <div className=" flex flex-col gap-2">
                  <CardTitle className="text-gray-400/70">Order ID</CardTitle>
                  <CardTitle className="text-xs">#{order._id}</CardTitle>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:items-center items-end">
                  <Badge className="rounded-full " variant={"outline"}>
                    Estimated Delivery {formatDate(order.deliveredAt)}
                  </Badge>
                  <Badge className="bg-green-200/30 border-none text-green-600 uppercase rounded-full text-sm px-4 py-2">
                    {order.status}
                  </Badge>
                </div>
              </div>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="">
                <h2 className="text-lg font-bold">Order Summary</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2  mt-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 shadow p-2 rounded-lg"
                    >
                      <Image
                        src={product.image || "/payment.png"}
                        alt={product.name || ""}
                        className="w-16 h-16 rounded-lg object-cover"
                        width={64}
                        height={64}
                      />
                      <div className="flex flex-col">
                        <Link
                          href={`/products/${product.productId}`}
                          className="text-sm font-semibold hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          Size: {product.size}
                        </p>
                        <p className="text-sm font-medium">
                          {formatCurrency(product.price || 0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-300/30 rounded-b-xl ">
              <div className="p-5 flex justify-between items-center w-full">
                <div className="flex">
                  <p>{formatCurrency(order.totalAmount || 0)}</p>
                  <p>({order.productsCount} item{order.productsCount > 1 && "s"})</p>
                </div>
                <Button asChild className="rounded-full">
                  <Link href={`/orders/${order._id}`}> Details</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
