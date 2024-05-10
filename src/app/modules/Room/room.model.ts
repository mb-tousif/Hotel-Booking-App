import mongoose, { Schema, model } from "mongoose";
import { TRoom } from "./room.interfaces";

const roomSchema = new Schema<TRoom>(
  {
    roomNo: {
      type: String,
      enum: ["S101", "S102", "S103", "S104", "S105", "D201", "D202", "D203", "D204", "D205", "F301", "F302", "F303", "F304", "F305", "SU401", "SU402", "SU403", "SU404", "SU405"],
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
      enum: [ "Complementary Breakfast", "Free Wifi", "Swimming Pool", "Gym", "Parking", "Airport Pick up", "Airport Drop", "Laundry", "Spa", "Bar", "Restaurant"],
      default: [ "Complementary Breakfast", "Free Wifi", "Parking", "Airport Pick up", "Gym", "Swimming Pool"],
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

export const Room = model<TRoom>("room", roomSchema);