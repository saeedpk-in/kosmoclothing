"use server";
// app/actions/userActions.ts
import { connectToDatabase } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";
import Cart from "@/models/Cart";
import nodemailer from "nodemailer";
import Orders from "@/models/Order";
// import { uploadImage } from "./upoladImg";

// Action to create a new user and send verification email
export async function createUser({
  name,
  email,
  password,
  address,
  phoneNumber,
  cartId,
  orderIds,
  imageUrl,
}: {
  name: string;
  email: string;
  password: string;
  address: { street?: string; city?: string; postalCode?: string };
  phoneNumber: string;
  cartId?: string | null;
  orderIds?: string[] | null;
  imageUrl?: string;
}) {
  try {
    // Connect to the database
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        error: "In this email there is an account.so please move to login",
      };
    }

    // Generate verification tokens
    const emailVerificationToken = generateCode();

    // Set token expiration time (e.g., 1 hour)
    const emailVerificationExpires = new Date(Date.now() + 3600000); // 1 hour

    // Send verification email
    await sendEmailVerification(email, emailVerificationToken);

    // Hash password
    const bPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password: bPassword,
      image: imageUrl || undefined,
      address,
      phoneNumber,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Save the new user
    await newUser.save();

    // Handle cart association
    if (cartId) {
      const cart = await Cart.findOne({ cartId });
      if (cart) {
        cart.userId = newUser._id;
        await cart.save();
      }
    }
    if (orderIds) {
      await Orders.updateMany(
        { _id: { $in: orderIds }, userId: null },
        { $set: { userId: newUser._id } }
      );
    }

    return { success: true, message: "Verification email has been sent." };
  } catch (error) {
    console.log(error);

    return { success: false, error: (error as Error).message };
  }
}

// Token generation for email verification
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Random 6-digit code
};

// Setup Nodemailer for email sending
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Verification
export async function sendEmailVerification(email: string, token: any) {
  const message = {
    from: `"Kosmo Verification" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Kosmo Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #333;">Kosmo Verification</h2>
          <p style="text-align: center; color: #666;">Use the code below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 4px; padding: 20px 40px; background-color: #f0f0f0; border-radius: 6px; color: #222;">${token}</span>
          </div>
          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            If you didn't request this code, it's possible someone is trying to access your account using your email address. 
            Please do not share this code with anyone.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 40px; text-align: center;">
            This email was sent by Kosmo. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(message);
}

export async function verifyEmailToken({
  emailToken,
  email,
}: {
  emailToken: string;
  email: string;
}) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if user exists with the provided token and email
    const user: IUser | null = await User.findOne({
      emailVerificationToken: emailToken,
      email: email,
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid or expired email verification token.",
      };
    }

    // Check if the token has expired
    if (
      user.emailVerificationExpires &&
      user.emailVerificationExpires < new Date()
    ) {
      return { success: false, error: "Email verification token has expired." };
    }

    // Update user's email verification status
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return { success: true, message: "Email verification successful." };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getUserById(id: string) {
  await connectToDatabase();
  const user = await User.findById(id);

  if (!user) {
    return { success: false, error: "User not found" };
  }

  return {
    success: true,
    user: JSON.parse(
      JSON.stringify({
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        image: user.image,
        password: user.password,
      })
    ),
  };
}

// Server-side logic (PUT request) inside the component using `use server`
export async function updateUserById(
  id: string,
  data: {
    name?: string;
    email?: string;
    password?: string;
    address?: {
      street?: string;
      city?: string;
      postalCode?: string;
    };
    phoneNumber?: string;
  }
) {
  await connectToDatabase();

  // Destructure the incoming data
  const { name, email, password, address, phoneNumber } = data;

  const updatedFields: any = {};
  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;
  if (password) updatedFields.password = await bcrypt.hash(password, 10);
  if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
  if (address?.street) updatedFields.address.street = address.street;
  if (address?.city) updatedFields.address.city = address.city;
  if (address?.postalCode)
    updatedFields.address.postalCode = address.postalCode;

  const updatedUser = await User.findOneAndUpdate({ _id: id }, updatedFields, {
    new: true,
  });

  if (!updatedUser) {
    return { error: "User not found" };
  }

  return { success: true, message: "User updated successfully!" };
}

export async function mergeGuestDataToUserData({
  cartId,
  email,
  orderIds,
}: {
  cartId: string | null;
  orderIds: string[] | null;
  email: string;
}) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const guestCart = await Cart.findOne({ cartId });
    if (!guestCart) {
      return { success: true };
    }

    let userCart = await Cart.findOne({ userId: user._id });
    if (!userCart) {
      userCart = await Cart.create({
        userId: user._id,
        cartId: Math.random().toString(36).substring(2, 15),
        items: [],
      });
    }

    guestCart.items.forEach((guestItem: any) => {
      const existingItem = userCart.items.find(
        (item: any) =>
          item.productId === guestItem.productId && item.size === guestItem.size
      );
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    });

    await userCart.save();
    await Cart.deleteOne({ cartId });

    await Orders.updateMany(
      { _id: { $in: orderIds }, userId: null },
      { $set: { userId: user._id } }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const message = {
      from: `"Conatct Form |" <${process.env.EMAIL_USER}>`,
      to: "info@kosmoclothing.in",
      subject: `New Contact Message: ${data.subject}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #000000; padding: 25px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 500;">New Contact Form Submission</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <div style="margin-bottom: 25px;">
        <span style="display: block; font-size: 14px; color: #666666; margin-bottom: 5px;">From</span>
        <span style="font-size: 16px; color: #000000;">${data.name} &lt;${
        data.email
      }&gt;</span>
      </div>
      
      <div style="margin-bottom: 25px;">
        <span style="display: block; font-size: 14px; color: #666666; margin-bottom: 5px;">Subject</span>
        <span style="font-size: 16px; color: #000000;">${data.subject}</span>
      </div>
      
      <div style="border-top: 1px solid #eeeeee; margin: 25px 0;"></div>
      
      <div style="background-color: #f9f9f9; border-left: 4px solid #000000; padding: 15px; margin-bottom: 25px;">
        ${data.message.replace(/\n/g, "<br>")}
      </div>
      
      <div style="border-top: 1px solid #eeeeee; margin: 25px 0;"></div>
      
      <p style="margin-bottom: 0; font-size: 14px; color: #333333;">
        Reply directly to this email to respond to ${data.name}.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee;">
      <p style="margin: 0 0 5px 0;">© ${new Date().getFullYear()} Kosmo Clothing</p>
    </div>
  </div>
      `,
    };

    await transporter.sendMail(message);

    return {
      success:true
    }
  } catch (error) {
    return {
      success:false,
      message:"An error occured to sent message try again"
    }
  }
}
export async function addEmail(email:string) {
  try {
    const message = {
      from: `"Conatct Form |" <${process.env.EMAIL_USER}>`,
      to: "info@kosmoclothing.in",
      subject: "New Newsletter ",
      text: `email:${email}`,
    };

    await transporter.sendMail(message);

    return {
      success:true
    }
  } catch (error) {
    return {
      success:false,
      message:"An error occured to sent message try again"
    }
  }
}
