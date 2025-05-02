import { auth } from "@/auth";
import { SuccessConfetti } from "@/components/intractive/SuccessConfetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency } from "@/lib/utils";
import Orders from "@/models/Order";
import Products from "@/models/Products";
import { IOrder } from "@/types";
import { CheckCircle, ShoppingBag, Clock, MapPin, Truck } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Confirmed",
};
const statusSteps = [
  {
    key: "confirmed",
    label: "Order confirmed",
    description: "We've received your order.",
  },
  {
    key: "dispatched",
    label: "Dispatched",
    description: "Your order has left our warehouse.",
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "out of delivery",
    label: "Out for delivery",
    description: "Your order is almost there.",
  },
  { key: "delivered", label: "Delivered", description: "Expected by " }, // date will be added dynamically
];
export default async function OrderConfirmation({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const { order: orderId } = await params;
  const session = await auth();
  await connectToDatabase();

  const orderDoc = await Orders.findById(orderId);
  if (!orderDoc) {
    notFound();
  }

  const order = {
    ...orderDoc.toObject(),
    _id: orderDoc._id.toString(),
    totalAmount: parseFloat(orderDoc.totalAmount),
    createdAt: orderDoc.createdAt.toISOString(),
  };

  // Optional: check user ownership
  if (session?.user && order.userId) {
    if (order.userId !== session.user.id) {
      notFound();
    }
  }

  // Step 1: Get all productIds from order
  const productIds = order.products.map((product: any) => product.productId);

  // Step 2: Fetch product details for all unique IDs
  const productsDocs = await Products.find({ _id: { $in: productIds } });

  // Step 3: Convert and clean product data
  const productsMap = new Map(
    productsDocs.map((doc) => {
      const obj = doc.toObject();
      return [
        obj._id.toString(),
        {
          ...obj,
          _id: obj._id.toString(),
          price: parseFloat(obj.price),
        },
      ];
    })
  );

  // Step 4: Merge each ordered item with its product data, keeping size and quantity
  const orderItems = order.products.map((item: any) => {
    const product = productsMap.get(item.productId);
    return {
      ...product,
      size: item.size,
      quantity: item.quantity,
    };
  });
  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.key === order.status
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SuccessConfetti />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your order #{order._id} has been
            received.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Clock className="mr-2 h-4 w-4" />
            Estimated delivery:{" "}
            {new Date(order.deliveredAt).toLocaleDateString()}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Summary
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {orderItems.map((item: any, idx: any) => (
              <div key={idx} className="px-6 py-5 flex">
                <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <div className="">
                      <h3>{item.name}</h3>
                      <Badge className=" w-fit bg-zinc-600 text-xs">
                        {item.size}
                      </Badge>
                    </div>
                    <p>{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Qty:
                    {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 px-6 py-5">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
              <p>Shipping</p>
              <p>Free Delivery</p>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <p>Total</p>
              <p>{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-900">{order.customerName}</p>
              <p className="text-gray-600">{order.email}</p>
              <p className="text-gray-600">
                {order.city}, {order.state} {order.pinCode}
              </p>
              <p className="text-gray-600">India</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Method
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-900">{order.paymentMethod}</p>
              <p className="mt-2 text-sm text-gray-600">
                Billing address is the same as shipping address
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {/* <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              What's Next?
            </h2>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500">
                  <CheckCircle className="h-full w-full" />
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Order confirmed</span> - We've
                  received your order.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-300">
                  {!(order.status === "confirmed") ? (
                    <CheckCircle className="h-full w-full" />
                  ) : (
                    <svg
                      className="h-full w-full"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Shipped</span> - Your order is
                  on its way to you.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-300">
                  {order.status === "delivered" ? (
                    <CheckCircle className="h-full w-full" />
                  ) : (
                    <svg
                      className="h-full w-full"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Delivered</span> - Expected by{" "}
                  {new Date(
                    order.deliveredAt
                  ).toLocaleDateString()}
                  .
                </p>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              What's Next?
            </h2>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-4">
              {statusSteps.map((step, index) => {
                const isComplete = index <= currentStatusIndex;
                return (
                  <li key={step.key} className="flex items-start">
                    <div
                      className={`flex-shrink-0 h-6 w-6 ${
                        isComplete ? "text-green-500" : "text-gray-300"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-full w-full" />
                      ) : (
                        <svg
                          className="h-full w-full"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="ml-3 text-gray-700">
                      <span className="font-medium">{step.label}</span> -{" "}
                      {step.key === "delivered"
                        ? `${step.description}${new Date(
                            order.deliveredAt
                          ).toLocaleDateString()}`
                        : step.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/orders">View Order Details</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a
              href="/contact"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
