// import { getOrderById } from "@/actions/orders";
// import Link from "next/link";
// import { formatDate, formatCurrency } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ChevronRight, Truck } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import OrderStepper from "@/components/intractive/OrderStepper";
// import { connectToDatabase } from "@/lib/mongodb";
// import { Card } from "@/components/ui/card";
// import OrderDangerButton from "@/components/intractive/OrderDangerButton";
// import Replacements from "@/models/Replacements";
// const page = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id: orderId } = await params;

//   await connectToDatabase();
//   const { order, success } = await getOrderById(orderId);
//   if (!order || !success) {
//     return <div className="text-center">Order not found</div>;
//   }
//   const currentStatusIndex = [
//     "confirmed",
//     "dispatched",
//     "shipped",
//     "out of delivery",
//     "delivered",
//   ].findIndex((step) => step === order.status);
  
//   return (
//     <div key={order._id} className="min-h-screen p-10">
//       <div className="flex ">
//         <div className="w-full">
//           <Accordion
//             type="multiple"
//             className="space-y-4 w-full"
//             defaultValue={["item-1", "item-2"]}
//           >
//             <Card>
//               <AccordionItem value="item-1">
//                 <AccordionTrigger className=" hover:no-underline font-extrabold px-8">
//                   Order Items
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <div className="px-10 w-full">
//                     <ul className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8 h-fit w-full">
//                       {order.products.map(
//                         async(
//                           product: {
//                             productId: string;
//                             name: string;
//                             image: string;
//                             size: string;
//                             price: number;
//                             quantity: number;
//                           },
//                           index: number
//                         ) => {
//                           const replacement = await Replacements.findOne({ orderId, productId:product.productId });
//                           return (
//                             <li
//                               key={index}
//                               className="flex justify-between items-start gap-4 p-3 shadow border rounded-lg"
//                             >
//                               <div className="flex gap-3 relative">
//                                 <Badge className="text-xs absolute -top-2 -left-2 cursor-pointer z-10 rounded-full">
//                                   {product.quantity}
//                                 </Badge>
//                                 <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
//                                   <Image
//                                     src={product.image || "/payment.png"}
//                                     fill
//                                     alt={product.name || ""}
//                                     className="object-cover rounded-xl border"
//                                   />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                   {/* <Link
//                             href={`/products/${product.productId}`}
//                             className="text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors"
//                           >
//                             {product.name}
//                           </Link> */}
//                                   <Badge className="w-fit bg-zinc-600 text-xs">
//                                     {product.size}
//                                   </Badge>
//                                   {replacement && (
//                                     <Badge className="w-fit bg-zinc-600 text-xs">
//                                       {replacement.status} -- Replacement
//                                     </Badge>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="flex flex-col items-end space-y-2">
//                                 <div className="items-end flex flex-col">
//                                   <p className="text-xs">Unit price</p>
//                                   <h2 className="text-sm sm:text-base">
//                                     {formatCurrency(product.price || 0)}
//                                   </h2>
//                                 </div>
//                                 <div className="items-end flex flex-col">
//                                   <p className="text-xs">Total price</p>
//                                   <h4 className="text-sm">
//                                     {formatCurrency(
//                                       (product.price || 0) * product.quantity
//                                     )}
//                                   </h4>
//                                 </div>
//                               </div>
//                             </li>
//                           );
//                         }
//                       )}
//                     </ul>
//                     <div className="space-y-3">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Subtotal</span>
//                         <span className="font-medium">
//                           {formatCurrency(order.totalAmount)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Shipping</span>
//                         <span className="font-medium">Free</span>
//                       </div>
//                       <hr className="my-2" />
//                       <div className="flex justify-between text-lg font-bold">
//                         <span>Total</span>
//                         <span>{formatCurrency(order.totalAmount)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Card>
//             <Card>
//               <AccordionItem value="item-2">
//                 <AccordionTrigger className=" hover:no-underline font-extrabold  px-8">
//                   Order Details
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <div className="grid grid-cols-1 gap-3 md:grid-cols-2  mt-4 px-10">
//                     {/* Order Summary Card */}
//                     <div className="rounded-lg border bg-card p-6 shadow-sm">
//                       <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
//                       <div className="space-y-4">
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Order ID
//                           </span>
//                           <span className="font-medium">#{order._id}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Ordered Date
//                           </span>
//                           <span className="font-medium">
//                             {order.createdAt
//                               ? formatDate(order.createdAt)
//                               : "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Delivery Date
//                           </span>
//                           <span className="font-medium">
//                             {order.deliveredAt
//                               ? formatDate(order.deliveredAt)
//                               : "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Status</span>
//                           <Badge>
//                             {order.status.charAt(0).toUpperCase() +
//                               order.status.slice(1)}
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Payment & Shipping Card */}
//                     <div className="rounded-lg border bg-card p-6 shadow-sm">
//                       <h2 className="mb-4 text-xl font-bold">
//                         Payment & Shipping
//                       </h2>
//                       <div className="space-y-4">
//                         <div>
//                           <h3 className="text-sm font-semibold text-muted-foreground">
//                             Payment Method
//                           </h3>
//                           <p className="mt-1 font-medium">
//                             {order.paymentMethod === "COD"
//                               ? "Cash on Delivery"
//                               : "Online Payment"}
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-muted-foreground">
//                             Payment Status
//                           </h3>
//                           <Badge className="mt-1">
//                             {order.paymentMethod === "COD" ? "Pending" : "Paid"}
//                           </Badge>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-muted-foreground">
//                             Shipping Address
//                           </h3>
//                           <address className="mt-1 not-italic">
//                             <p>{order.customerName}</p>
//                             <p>
//                               {order.address}, {order.street}
//                             </p>
//                             <p>
//                               {order.city}, {order.state}
//                             </p>
//                             <p>India - {order.pinCode}</p>
//                             <p className="mt-2">Phone: {order.mobile}</p>
//                           </address>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Card>
//           </Accordion>
//           <div className="flex gap-3 w-full justify-center ">
//             <OrderDangerButton
//               orderId={order._id}
//               orderStatus={order.status}
//               deliveryDate={order.deliveredAt}
//             />
//           </div>
//         </div>
//         <div className="">
//           <div className="flex  gap-4 justify-between  px-10">
//             <div className="bg-white overflow-hidden w-full shadow  rounded-lg">
//               <div className="px-6 py-5 border-b border-gray-200">
//                 <h2 className="text-lg font-medium text-gray-900 flex items-center">
//                   <Truck className="mr-2 h-5 w-5" />
//                   {order.status}
//                 </h2>
//                 <p className="text-muted-foreground text-sm">
//                   Ordered on {formatDate(order.createdAt)}
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                   estimated delivery on {formatDate(order.deliveredAt)}
//                 </p>
//                 <p className="text-muted-foreground">Order #</p>
//                 <p className="font-mono font-medium">{order._id}</p>
//               </div>
//               <div className="px-6 py-5">
//                 <OrderStepper
//                   currentStatusIndex={currentStatusIndex}
//                   deliveryDate={order.deliveredAt}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
import { getOrderById } from "@/actions/orders";
import { formatDate, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Truck, Package, CreditCard, MapPin, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderStepper from "@/components/intractive/OrderStepper";
import { connectToDatabase } from "@/lib/mongodb";
import { Card } from "@/components/ui/card";
import OrderDangerButton from "@/components/intractive/OrderDangerButton";
import Replacements from "@/models/Replacements";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: orderId } = await params;

  await connectToDatabase();
  const { order, success } = await getOrderById(orderId);
  if (!order || !success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find an order with that ID</p>
          <Button variant="outline" className="w-full">
            Back to Orders
          </Button>
        </Card>
      </div>
    );
  }

  const currentStatusIndex = [
    "confirmed",
    "dispatched",
    "shipped",
    "out of delivery",
    "delivered",
  ].findIndex((step) => step === order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Details</h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Order #{order._id}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Order Items Card */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Items
                  </h2>
                  <Badge variant="outline">
                    {order.products.reduce((acc, product) => acc + product.quantity, 0)} items
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {order.products.map(async (product, index) => {
                    const replacement = await Replacements.findOne({ 
                      orderId, 
                      productId: product.productId 
                    });
                    
                    return (
                      <li key={index} className="py-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative flex-shrink-0 w-20 h-20 rounded-md  border overflow-visible">
                            <Image
                              src={product.image || "/placeholder-product.jpg"}
                              fill
                              alt={product.name || ""}
                              className="object-cover rounded-xl"
                            />
                            <Badge className="text-xs absolute -top-2 -left-2 cursor-pointer z-10 rounded-full">
                                 {product.quantity}
                             </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Size: {product.size}
                                </p>
                                {replacement && (
                                  <Badge variant="outline" className="mt-1 text-xs">
                                    Replacement: {replacement.status}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {formatCurrency(product.price)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatCurrency(product.price * product.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="border-t p-6 bg-gray-50">
                <div className="space-y-3 max-w-md ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Details Card */}
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Order Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Info */}
                <div>
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                    <h3 className="font-medium">Payment Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method</span>
                      <span>
                        {order.paymentMethod === "COD" 
                          ? "Cash on Delivery" 
                          : "Online Payment"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge variant={order.paymentMethod === "COD" ? "outline" : "default"}>
                        {order.paymentMethod === "COD" ? "Pending" : "Paid"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-gray-700" />
                    <h3 className="font-medium">Shipping Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address</span>
                      <span className="text-right">
                        {order.city}, {order.state} - {order.pinCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span>{order.mobile}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 mr-2 text-gray-700" />
                    <h3 className="font-medium">Delivery Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery</span>
                      <span>
                        {order.deliveredAt 
                          ? formatDate(order.deliveredAt) 
                          : "Calculating..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-center">
              <OrderDangerButton
                orderId={order._id}
                orderStatus={order.status}
                deliveryDate={order.deliveredAt}
              />
            </div>
          </div>

          {/* Order Status Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Order Status
                </h2>
              </div>
              <div className="p-6">
                <OrderStepper
                  currentStatusIndex={currentStatusIndex}
                  deliveryDate={order.deliveredAt}
                />
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono">#{order._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Delivery</span>
                    <span>
                      {order.deliveredAt 
                        ? formatDate(order.deliveredAt) 
                        : "Calculating..."}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Support Card */}
            <Card>
              <div className="p-6">
                <h3 className="font-medium mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, contact our customer support.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;