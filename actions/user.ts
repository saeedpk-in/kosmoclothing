"use server"
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
    const existingUser = await User.findOne({email})
    if(existingUser){
      return { success: false, error: "In this email there is an account.so please move to login" };
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
    if(orderIds){
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
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Your verification code is ${token}`,
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
    user: JSON.parse(JSON.stringify({
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      image: user.image,
    })),
  };
}

// Server-side logic (PUT request) inside the component using `use server`
export async function updateUserById(
  id: string,
  data: {
    name: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    image?: string;
  }
) {
  await connectToDatabase();

  // Destructure the incoming data
  const { name, email, password, address, phoneNumber, image } = data;

  if (!name || !email || !password) {
    return { error: "All fields and at least one image are required!" };
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email, password, phoneNumber, address, image },
    { new: true }
  );

  if (!updatedUser) {
    return { error: "User not found" };
  }

  return { success:true , message: "User updated successfully!", user: updatedUser };
}

export async function mergeGuestDataToUserData({ cartId , email ,orderIds  }:{cartId: string | null, orderIds: string[] | null, email: string}) {
  try {
    await connectToDatabase()
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
      const existingItem = userCart.items.find((item: any) => item.productId === guestItem.productId && item.size === guestItem.size);
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

    return { success: true  };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}