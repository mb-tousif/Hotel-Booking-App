import mongoose, { Schema, model } from "mongoose";
import { TUser } from "./user.interfaces";
import bcrypt from "bcrypt";
import Config from "../../../Config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    contactNo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre<TUser>("save", async function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, Number(Config.salt_rounds));
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = function (
  password: string | Buffer,
  hash: string
) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

export const User = model<TUser>("user", userSchema);
