import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    room: z.string({
      required_error: "Room id is required",
    }),
    user: z.string({
      required_error: "User id is required",
    }),
    date: z.string({
      required_error: "Booking date is required",
    }),
    status: z.enum(["Booked", "Cancelled"]).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    room: z.string().optional(),
    user: z.string().optional(),
    date: z.string().optional(),
    status: z.enum(["Booked", "Cancelled"]).optional(),
  }),
});

export const BookingValidation = {
    postValidation,
    updateValidation
}