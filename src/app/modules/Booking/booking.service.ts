import httpStatus from "http-status";
import { Booking } from "./booking.model";
import CustomApiError from "../../../Error/customErrorHandler";
import { TBooking } from "./booking.interfaces";
import mongoose, { SortOrder } from "mongoose";
import { Room } from "../Room/room.model";
import { User } from "../User/user.model";
import { PaginationHandler } from "../../../utils/paginationHelper";
import { IPaginationOptions } from "../../../types/common";
import { TBookingFilterableOptions } from "./booking.interfaces";
import { bookingFilterAbleField } from "./booking.constants";
import { EmailService } from "../../../utils/nodeMailer";

const createBooking = async ( payload: TBooking) => {
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
    const isRoomExists = await Room.findOne({ _id: payload.roomId, status: "Ready" });
    if (!isRoomExists) {
        throw new CustomApiError(httpStatus.BAD_REQUEST, "Room is not available");
    }
    await Room.updateOne({ _id: payload.roomId }, { status: "Booked" });
    const isUserExists = await User.findOne({ _id: payload.userId });
    if (!isUserExists) {
        throw new CustomApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    const booking = await Booking.create(payload);
    await User.updateOne({ _id: payload.userId }, { $push: { booking: booking._id } });
    await Room.updateOne({ _id: payload.roomId }, { $push: { booking: booking._id } });
    const mailPayload = {
        roomNo: isRoomExists.roomNo,
        date: payload.date,
        status: booking.status,
    };
    await EmailService.BookingConfirmationMail(isUserExists.name as string, isUserExists.email, mailPayload);
    session.commitTransaction();
    session.endSession();
    return booking;
   } catch (error) {
    session.abortTransaction();
    throw error;
   }
}

const getAllBookings = async (
  options: IPaginationOptions,
  filters: TBookingFilterableOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } = PaginationHandler(options);
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: bookingFilterAbleField.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .populate({ path: "room", strictPopulate: false })
    .populate({ path: "user", strictPopulate: false })
    .lean();
  const total = await Booking.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Cancel booking
const cancelBooking = async ( id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const isBookingExist = await Booking.findOne({ _id: id });
        if (!isBookingExist) {
            throw new CustomApiError(httpStatus.BAD_REQUEST, "Booking not found");
        }
        await Room.updateOne({ _id: isBookingExist.roomId }, { status: "Ready" });
        await Booking.updateOne({ _id: id }, { status: "Cancelled" });
        const booking = await Booking.findOne({ _id: id })
        const userInfo = await User.findOne({ _id: booking?.userId});
        const roomInfo = await Room.findOne({ _id: booking?.roomId});
        const mailPayload = {
          roomNo: roomInfo?.roomNo,
          date: booking?.date,
          status: booking?.status,
        };
        await EmailService.BookingCancelationMail(
          userInfo?.name as string,
          userInfo?.email as string,
          mailPayload as any
        );
        session.commitTransaction();
        session.endSession();
        return booking;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
}

export const BookingService = {
    createBooking,
    getAllBookings,
    cancelBooking,
};

