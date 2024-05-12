import mongoose, { Model } from "mongoose";

export type TBookingFilterableOptions = {
    search?: string;
    status?: string;
    date?: string;
}

export type TBooking = {
  _id?: string;
  roomId?: string;
  userId?: string;
  date: string;
  status: string;
};

export type BookingModel = Model<TBooking, Record<string, unknown>>;