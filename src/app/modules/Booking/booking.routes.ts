import express from 'express';
import AuthenticateUser from '../../middleware/authenticateUser';
import ZodValidateRequest from '../../middleware/validateZodReq';
import { BookingValidation } from './booking.zod.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get(
  "/all-bookings",
  AuthenticateUser(),
  BookingController.getAllBookings
);

router.post(
  "/create-booking",
  AuthenticateUser(),
  ZodValidateRequest(BookingValidation.postValidation),
  BookingController.createBooking
);

router.post(
  "/cancel-booking",
  AuthenticateUser(),
  ZodValidateRequest(BookingValidation.cancelValidation),
  BookingController.cancelBooking
);


export const BookingRoutes = router;

