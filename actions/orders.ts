"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency } from "@/lib/utils";
import Orders from "@/models/Order";
import Products from "@/models/Products";
import User from "@/models/User";
import { IOrder, IOrderItem } from "@/types";
import nodemailer from "nodemailer";
async function createOrder(order: IOrder) {
  const {
    email,
    mobile,
    customerName,
    address,
    street,
    city,
    state,
    pinCode,
    paymentMethod,
    products,
    totalAmount,
    userId,
    status,
  } = order;

  if (
    !email ||
    !mobile ||
    !customerName ||
    !address ||
    !street ||
    !city ||
    !state ||
    !pinCode ||
    !paymentMethod ||
    !totalAmount ||
    products.length === 0
  ) {
    throw new Error("All fields and at least one product are required!");
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new order and save it to the DB
    const newOrder = new Orders({
      mobile,
      customerName,
      address,
      street,
      city,
      state,
      pinCode,
      paymentMethod,
      products,
      totalAmount,
      email,
      userId: userId ? userId : null,
      status,
    });

    await newOrder.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const productIds = products.map((product) => product.productId);
    const productsDetails = await Products.find({ _id: { $in: productIds } });

    const message = {
      from: process.env.EMAIL_USER,
      to: email, // recipient's email address
      subject: "Your Order Receipt",
      text: `Thank you for your order! Your receipt details are below.`, // Plain text version (for email clients that don't support HTML)
      html: `
        
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <h2 style="text-align: center; color: #4CAF50;">Order Receipt</h2>
          
          <!-- Order details -->
          <div style="border-bottom: 2px solid #f1f1f1; padding-bottom: 20px; margin-bottom: 20px;">
            <h3 style="font-size: 18px;">Order Summary</h3>
            <p style="font-size: 16px;">Order Number: <strong>${
              newOrder._id
            }</strong></p>
            <p style="font-size: 16px;">Date: <strong>${new Date().toLocaleDateString()}</strong></p>
            <p style="font-size: 16px;">Customer: <strong>${
              newOrder.customerName
            }</strong></p>
            <p style="font-size: 16px;">Shipping Address: <strong>${
              newOrder.address
            }, ${newOrder.street}, ${newOrder.city}</strong></p>
          </div>

          <!-- Product details -->
          <h3 style="font-size: 18px;">Items Purchased</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Image</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Size</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Price</th>
            </tr>
            ${productsDetails
              .map((product) => {
                const orderProduct = newOrder.products.find(
                  (p: any) => p.productId.toString() === product._id.toString()
                );
                return `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                    <img src="${product.images[0]}" alt="${
                  product.name
                }" width="40" height="40" style="object-fit: cover; border-radius: 4px;" />
                  </td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                    product.name
                  }</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                    orderProduct?.quantity || 0
                  }</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                    orderProduct?.size || "N/A"
                  }</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatCurrency(
                    product.price
                  )}</td>
                </tr>
              `;
              })
              .join("")}
          </table>

          <!-- Total -->
          <div style="border-top: 2px solid #f1f1f1; padding-top: 20px;">
            <h3 style="font-size: 18px; text-align: right;">Total: <strong>${formatCurrency(
              newOrder.totalAmount
            )}</strong></h3>
          </div>

          <!-- Thank you message -->
          <div style="margin-top: 20px; text-align: center;">
            <p style="font-size: 16px;">Thank you for shopping with us! If you have any questions about your order, feel free to contact us at <strong>groupkosmo@gmail.com</strong>.</p>
            <p style="font-size: 14px; color: #999;">This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      `,
    };

    // Send the email
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    return { success: true, orderId: newOrder._id.toString() };
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to save order.");
  }
}

async function getOrders({
  orderIds,
  userId,
}: {
  orderIds?: string[];
  userId?: string;
}) {
  await connectToDatabase();

  if (!orderIds && !userId) {
    return {
      success: false,
      message: "Either userId or orderIds is required",
    };
  }

  try {
    let query = {};

    if (orderIds) {
      query = { _id: { $in: orderIds } };
    } else if (userId) {
      query = { userId };
    }

    const orders = await Orders.find(query).lean();
    const plainOrders = await Promise.all(
      orders.map(async (order) => {
        const productItems = await Promise.all(
          order.products.slice(0, 2).map(async (product: IOrderItem) => {
            const productDetails = await Products.findById(product.productId);
            return {
              productId: product.productId.toString(),
              size: product.size,
              quantity: product.quantity,
              price: productDetails?.price || 0,
              image: productDetails?.images?.[0] || "/placeholder.png",
              total: product.quantity * (productDetails?.price || 0),
              name: productDetails?.name || "Product",
            };
          })
        );

        return {
          _id: String(order._id),
          email: order.email,
          mobile: order.mobile,
          customerName: order.customerName,
          address: order.address,
          street: order.street,
          city: order.city,
          state: order.state,
          pinCode: order.pinCode,
          paymentMethod: order.paymentMethod,
          products: productItems,
          userId: order.userId?.toString() || null,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt,
          deliveredAt: order.deliveredAt,
          status: order.status,
          productsCount: order.products.length,
        };
      })
    );

    return {
      success: true,
      orders: plainOrders,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Database error occurred",
    };
  }
}
async function getOrderById(orderId: string) {
  await connectToDatabase();

  if (!orderId) {
    return {
      success: false,
      message: "orderId is required",
    };
  }

  try {
    const order = (await Orders.findById(orderId).lean<IOrder>()) as IOrder;
    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    const productItems = await Promise.all(
      order.products.map(async (product) => {
        const productDetails = await Products.findById(product.productId);
        return {
          productId: product.productId.toString(),
          size: product.size,
          quantity: product.quantity,
          price: productDetails?.price || 0,
          image: productDetails?.images?.[0] || "/placeholder.png",
          total: product.quantity * (productDetails?.price || 0),
          name: productDetails?.name || "Product",
        };
      })
    );

    const plainOrder = {
      _id: String(order._id),
      email: order.email,
      mobile: order.mobile,
      customerName: order.customerName,
      address: order.address,
      street: order.street,
      city: order.city,
      state: order.state,
      pinCode: order.pinCode,
      paymentMethod: order.paymentMethod,
      products: productItems,
      userId: order.userId?.toString() || null,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      status: order.status,
    };

    return {
      success: true,
      order: plainOrder,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Database error occurred",
    };
  }
}

async function deleteOrderById(orderId: string) {
  await connectToDatabase();

  if (!orderId) {
    return {
      success: false,
      message: "orderId is required",
    };
  }

  try {
    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false,
      message: "Failed to delete order",
    };
  }
}

async function getOrderProductsByIdForReplacement(orderId: string) {
  await connectToDatabase();

  if (!orderId) {
    return {
      success: false,
      message: "orderId is required",
    };
  }

  try {
    const order = await Orders.findById(orderId).lean<IOrder>();
    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    const isDelivered = order.status === "delivered";
    const deliveredAt = new Date(order.deliveredAt || 0).getTime();
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
    const isWithinReturnPeriod = deliveredAt + fiveDaysInMs > Date.now();
    const hasUserId = !!order.userId;

    if (!isDelivered) {
      return {
        success: false,
        message:
          "Order is not eligible for return. Because order not delivered yet,",
      };
    }
    if (!isWithinReturnPeriod) {
      return {
        success: false,
        message:
          "Order is not eligible for return. Because order is older than 5 days.",
      };
    }
    if (!hasUserId) {
      return {
        success: false,
        message:
          "Order is not eligible for return. Please login to your account and try again.",
      };
    }

    const productItems = await Promise.all(
      order.products.map(async (product) => {
        const productDetails = await Products.findById(product.productId);
        return {
          productId: product.productId.toString(),
          name: productDetails?.name || "Unknown Product",
          quantity: product.quantity,
        };
      })
    );

    return {
      success: true,
      products: productItems,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Database error occurred",
    };
  }
}

export {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  getOrderProductsByIdForReplacement,
};
// <html>
//           <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
//               <h2 style="text-align: center; color: #4CAF50;">Order Receipt</h2>

//               <!-- Order details -->
//               <div style="border-bottom: 2px solid #f1f1f1; padding-bottom: 20px; margin-bottom: 20px;">
//                 <h3 style="font-size: 18px;">Order Summary</h3>
//                 <p style="font-size: 16px;">Order Number: <strong>${
//                   newOrder._id
//                 }</strong></p>
//                 <p style="font-size: 16px;">Date: <strong>${new Date().toLocaleDateString()}</strong></p>
//                 <p style="font-size: 16px;">Customer: <strong>${
//                   newOrder.customerName
//                 }</strong></p>
//                 <p style="font-size: 16px;">Shipping Address: <strong>${
//                   newOrder.address
//                 } , ${newOrder.street} , ${newOrder.city}</strong></p>
//               </div>

//               <!-- Product details -->
//               <h3 style="font-size: 18px;">Items Purchased</h3>
//               <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//                 <tr style="background-color: #f9f9f9;">
//                   <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Image</th>
//                   <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
//                   <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Quantity</th>
//                   <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Size</th>
//                   <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Price</th>
//                 </tr>
//                 ${productsDetails.map((product) => `
//                     <tr>
//                       <td style="padding: 10px; border-bottom: 1px solid #ddd;">
//                         <img src={${product.image}} alt={${product.name}} width="20" height="20"/>
//                       </td>
//                       <td style="padding: 10px; border-bottom: 1px solid #ddd;">${product.name}</td>
//                       <td style="padding: 10px; border-bottom: 1px solid #ddd;">${newOrder.products.find((p: any) => p.productId.toString() === product._id.toString())?.quantity || 0}</td>
//                       <td style="padding: 10px; border-bottom: 1px solid #ddd;">${newOrder.products.find((p: any) => p.productId.toString() === product._id.toString())?.size || "N/A"}</td>
//                       <td style="padding: 10px; border-bottom: 1px solid #ddd;">${product.price}</td>
//                     </tr>
//                 `).join('')}
//               </table>

//               <!-- Total -->
//               <div style="border-top: 2px solid #f1f1f1; padding-top: 20px;">
//                 <h3 style="font-size: 18px; text-align: right;">Total: <strong>${newOrder.totalAmount}</strong></h3>
//               </div>

//               <!-- Thank you message -->
//               <div style="margin-top: 20px; text-align: center;">
//                 <p style="font-size: 16px;">Thank you for shopping with us! If you have any questions about your order, feel free to contact us at <strong>support@example.com</strong>.</p>
//                 <p style="font-size: 16px; color: #999;">This is an automated message, please do not reply.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//         <html>
