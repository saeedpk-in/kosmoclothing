"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency } from "@/lib/utils";
import Orders from "@/models/Order";
import Products from "@/models/Products";
import Replacements from "@/models/Replacements";
import { IOrder, IProduct } from "@/types";
import nodemailer from "nodemailer";
export async function createReplacement({
  productId,
  orderId,
  reason,
  quantity,
}: {
  productId: string;
  orderId: string;
  reason: string;
  quantity: number;
}) {
  try {
    await connectToDatabase();
    const session  = await auth()
    if(!session?.user?.id || !session?.user?.email){
        throw new Error("Session")
      }

      const existingReplacement = await Replacements.findOne({ orderId, productId })
      if(existingReplacement){
        return {
          success:false,
          message:"This product already requested to replacement"
        }
      }
    // Create a new order and save it to the DB
    const newReplacement = new Replacements({
      productId,
      userId:session.user.id,
      orderId,
      reason,
      quantity,
    });

    await newReplacement.save();
    const product = await Products.findById(productId)
    const order = await Orders.findById(orderId)
    const matchedItem = order?.products.find(
      (p: any) => p.productId === productId
    );
    
    const size = matchedItem?.size || "N/A";
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // const message = {
    //   from: process.env.EMAIL_USER,
    //   to: session.user.email,
    //   subject: "Your Replacement Request Confirmation",
    //   text: `Thank you for your replacement request! Your request details are below.`,
    //   html: `
    //     <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
    //       <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
    //         <h2 style="text-align: center; color: #4CAF50;">Replacement Request</h2>
            
    //         <!-- Request details -->
    //         <div style="border-bottom: 2px solid #f1f1f1; padding-bottom: 20px; margin-bottom: 20px;">
    //           <h3 style="font-size: 18px;">Request Summary</h3>
    //           <p style="font-size: 16px;">Order Number: <strong>${orderId}</strong></p>
    //           <p style="font-size: 16px;">Replacement Request Date: <strong>${new Date().toLocaleDateString()}</strong></p>
    //           <p style="font-size: 16px;">Customer: <strong>${session.user.name}</strong></p>
    //         </div>
    
    //         <!-- Replacement details -->
    //         <h3 style="font-size: 18px;">Items Requested for Replacement</h3>
    //         <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    //           <tr style="background-color: #f9f9f9;">
    //             <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
    //             <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Quantity</th>
    //             <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Reason</th>
    //           </tr>
    //           <tr>
    //             <td style="padding: 10px; border-bottom: 1px solid #ddd;">
    //               ${product.name}
    //             </td>
    //             <td style="padding: 10px; border-bottom: 1px solid #ddd;">
    //               ${quantity }
    //             </td>
    //             <td style="padding: 10px; border-bottom: 1px solid #ddd;">
    //               ${reason}
    //             </td>
    //           </tr>
    //         </table>
    
    //         <!-- Next steps -->
    //         <div style="border-top: 2px solid #f1f1f1; padding-top: 20px;">
    //           <h3 style="font-size: 18px;">Next Steps</h3>
    //           <p style="font-size: 16px;">Our team will review your request within 1-2 business days.</p>
    //           <p style="font-size: 16px;">You'll receive another email once your replacement is processed.</p>
    //         </div>
    
    //         <!-- Return instructions if needed -->
    //         <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
    //           <h4 style="font-size: 16px; margin-top: 0;">Return Instructions</h4>
    //           <p style="font-size: 14px; margin-bottom: 5px;">1. Package the item securely</p>
    //           <p style="font-size: 14px; margin-bottom: 5px;">2. Include this request number: <strong>REP-${Date.now()}</strong></p>
    //           <p style="font-size: 14px; margin-bottom: 5px;">3. Ship to: 123 Returns Center, Your City, Country</p>
    //         </div>
    
    //         <!-- Thank you message -->
    //         <div style="margin-top: 20px; text-align: center;">
    //           <p style="font-size: 16px;">Thank you for your patience. If you have any questions about your replacement, contact us at <strong>support@kosmo.com</strong>.</p>
    //           <p style="font-size: 14px; color: #999;">This is an automated message, please do not reply.</p>
    //         </div>
    //       </div>
    //     </body>
    //   `,
    // };
    const message = {
      from: process.env.EMAIL_USER,
      to: session.user.email,
      subject: "Replacement Request Received",
      text: `Thank you for your replacement request. We're processing it and will update you soon.`,
      html: `
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #334155; line-height: 1.6;">
          <div style="max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 500; color: #0f172a;">Your Replacement Request</h1>
              <p style="margin: 8px 0 0; color: #64748b; font-size: 15px;">We've received your request and will process it shortly</p>
            </div>
    
            <!-- Main Content -->
            <div style="padding: 24px;">
              <!-- Summary -->
              <div style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">REQUEST SUMMARY</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div>
                    <p style="font-size: 14px; color: #64748b; margin: 0 0 4px;">Order Number</p>
                    <p style="font-size: 15px; margin: 0; font-weight: 500;">${orderId}</p>
                  </div>
                  <div>
                    <p style="font-size: 14px; color: #64748b; margin: 0 0 4px;">Request Date</p>
                    <p style="font-size: 15px; margin: 0; font-weight: 500;">${new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
    
              <!-- Item -->
              <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <h2 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px;">ITEM FOR REPLACEMENT</h2>
                <div style="display: flex; gap: 16px;">
                  <img src="${product.images[0]}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />
                  <div style="flex: 1;">
                    <h3 style="font-size: 15px; margin: 0 0 6px; font-weight: 500;">${product.name}</h3>
                    <p style="font-size: 14px; color: #64748b; margin: 0 0 8px;">${size || 'One Size'} • Qty: ${quantity}</p>
                    <p style="font-size: 15px; font-weight: 500; margin: 0;">${formatCurrency(product.price * quantity)}</p>
                  </div>
                </div>
              </div>
    
              <!-- Reason -->
              <div style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">REASON FOR REPLACEMENT</h2>
                <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px;">
                  <p style="margin: 0; font-size: 15px;">${reason}</p>
                </div>
              </div>
    
              <!-- Next Steps -->
              <div style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #dcfce7;">
                <h2 style="font-size: 16px; font-weight: 600; color: #166534; margin-top: 0; margin-bottom: 12px;">NEXT STEPS</h2>
                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <div style=" color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</div>
                  <p style="margin: 0; font-size: 15px;">We'll review your request within 1-2 business days</p>
                </div>
                <div style="display: flex; gap: 12px;">
                  <div style=" color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">2</div>
                  <p style="margin: 0; font-size: 15px;">You'll receive an update email once processed</p>
                </div>
              </div>
    
              <!-- Return Info -->
              <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                <h2 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 12px;">RETURN DETAILS</h2>
                <p style="font-size: 15px; margin-bottom: 16px;">If you need to return the original item, please follow these instructions:</p>
                
                <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start;">
                  <div style=" color: #334155; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px;">1</div>
                  <p style="margin: 0; font-size: 15px;">Package the item securely</p>
                </div>
                <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start;">
                  <div style=" color: #334155; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px;">2</div>
                  <p style="margin: 0; font-size: 15px;">Include request number: <strong>${newReplacement._id}</strong></p>
                </div>
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                  <div style=" color: #334155; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px;">3</div>
                  <p style="margin: 0; font-size: 15px;">Ship to: ${order.address}, ${order.street}, ${order.city}, ${order.state}, India</p>
                </div>
              </div>
            </div>
    
            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px; font-size: 15px;">Need help? Contact us at <a href="mailto:groupkosmo@gmail.com" style="color: #3b82f6; text-decoration: none;">groupkosmo@gmail.com</a></p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">This is an automated message. Please do not reply directly.</p>
            </div>
          </div>
        </body>
      `
    };
    // Send the email
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    return {
      success:true,
      message:"Successfully requested replacement"
    }
  } catch (error) {
    return {
      success:false,
      message:error as string || "Something went wrong"
    }
  }
}

export async function getReplacements(userId: string) {
  try {
    await connectToDatabase();

    const replacements = await Replacements.find({ userId }).lean();

    const enrichedReplacements = await Promise.all(
      replacements.map(async (replacement:any) => {
        const product = await Products.findById(replacement.productId).lean() as IProduct | null;
        const order = await Orders.findById(replacement.orderId).lean() as IOrder | null;
        const matchedProductInOrder = order?.products.find(
          (item) => item.productId === replacement.productId.toString()
        );

        const size = matchedProductInOrder?.size || 'N/A';
        return {
          ...replacement,
          product: {
            size,
            name: product?.name || "Unknown Product",
            price: product?.price || 0,
            image: product?.images?.[0] || "/placeholder.png",
          },
        };
      })
    );

    return {
      success: true,
      replacements: JSON.parse(JSON.stringify(enrichedReplacements)) ,
    };
  } catch (error) {
    console.error("Error fetching replacements:", error);
    return {
      success: false,
      message: "Failed to fetch replacements",
    };
  }
}

export async function deleteReplacementById(replacementId: string) {
  try {
    await connectToDatabase();

    const deletedReplacement = await Replacements.findByIdAndDelete(replacementId);

    if (!deletedReplacement) {
      return {
        success: false,
        message: "Replacement not found",
      };
    }

    return {
      success: true,
      message: "Replacement successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting replacement:", error);
    return {
      success: false,
      message: "Failed to delete replacement",
    };
  }
}