import { Schema, model, Types } from "mongoose";
import { Role, IsActive, IUser } from "./user.interface";

/**
 * Auth Provider Schema
 */
const authProviderSchema = new Schema(
  {
    provider: {
      type: String,
      required: true, // "Google", "Credential"
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

/**
 * User Schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
    },

    picture: {
      type: String,
    },

    address: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
      required: true,
    },

    auths: {
      type: [authProviderSchema],
      required: true,
    },

    bookings: [
      {
        type: Types.ObjectId,
        ref: "Booking",
      },
    ],

    guides: [
      {
        type: Types.ObjectId,
        ref: "Guide",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
