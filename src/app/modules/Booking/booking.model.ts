import { Schema, model } from "mongoose";
import { BookingModel, TBooking } from "./booking.interfaces";

const bookingSchema = new Schema<TBooking>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
    userId: {
      type: Schema.Types.ObjectId,
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

export const Booking = model<TBooking, BookingModel>("booking", bookingSchema);