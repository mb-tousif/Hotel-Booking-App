import mongoose, { Schema, model } from "mongoose";
import { TBooking } from "./booking.interfaces";

const bookingSchema = new Schema<TBooking>(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ "Booked", "Cancelled"],
        default: "Booked"
    }
  },
  {
    timestamps: true,
  }
);