import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  image?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  emailVerificationToken?: string ;
  emailVerificationExpires?: Date ;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
    },
    image: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
});
// Check if the model already exists to avoid redefining it
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
