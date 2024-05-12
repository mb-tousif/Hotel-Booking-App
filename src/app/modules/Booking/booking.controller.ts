import httpStatus from "http-status";
import { BookingService } from "./booking.service";
import AsyncHandler from "../../../utils/asyncHandler";
import { Request, Response } from "express";
import ResponseHandler from "../../../utils/responseHandler";
import { HandleQuery } from "../../../utils/handleQuery";
import { paginationFields } from "../../../types/common";
import { bookingFilterAbleField } from "./booking.constants";

const createBooking = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user as any;
  const payload = req.body;
  payload.userId = id;
  const room = await BookingService.createBooking(payload);

  ResponseHandler(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: room,
  });
});

const getAllBookings = AsyncHandler(async (req: Request, res: Response) => {
    const options = HandleQuery(req.query, paginationFields);
    const filters = HandleQuery(req.query, bookingFilterAbleField);
    const rooms = await BookingService.getAllBookings(options, filters);
    
    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Booking Rooms retrieved successfully",
        data: rooms,
    });
});

const cancelBooking = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body.roomId;
    const room = await BookingService.cancelBooking(id);

    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: room,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings,
    cancelBooking
};
