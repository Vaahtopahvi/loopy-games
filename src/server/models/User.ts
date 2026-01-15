import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";

// Interface for TypeScript
export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// User Schema - stores admin credentials
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // You'll set this to true manually in the database
    },
  },
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt (random data) for hashing - 10 rounds is standard
    const salt = await bcryptjs.genSalt(10);
    // Hash the password with the salt
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare entered password with hashed password in database
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
