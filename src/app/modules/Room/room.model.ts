import mongoose, { Schema, model } from "mongoose";
import { RoomModel, TRoom } from "./room.interfaces";

const roomSchema = new Schema<TRoom>(
  {
    roomNo: {
      type: String,
      unique: true,
      required: [true, "Room Number is required"],
    },
    occupancy: {
      type: Number,
      required: [true, "Occupancy is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      enum: ["Single", "Double", "Family", "Suite"],
      required: [true, "Category is required"],
    },
    amenities: {
      type: [String],
      enum: [
        "Complementary Breakfast",
        "Free Wifi",
        "Swimming Pool",
        "Gym",
        "Parking",
        "Airport Pick up",
        "Airport Drop",
        "Laundry",
        "Spa",
        "TV",
        "Mini Bar",
        "Jacuzzi",
      ],
      default: [
        "Complementary Breakfast",
        "Free Wifi",
        "TV",
        "Mini Bar",
        "Parking",
        "Airport Pick up",
        "Gym",
        "Swimming Pool",
      ],
    },
    status: {
      type: String,
      enum: ["Out of Order", "Ready", "Checked In", "Checked Out", "Booked"],
      default: "Ready",
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

export const Room = model<TRoom, RoomModel>("room", roomSchema);