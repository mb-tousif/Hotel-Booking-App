import mongoose, { Model } from "mongoose";

export type TBookingFilterableOptions = {
    search?: string;
}

export type TBooking = {
  id?: string;
  room?: string;
  user?: string;
  date: string;
  status: string;
};

export type BookingModel = Model<TBooking, Record<string, unknown>>;