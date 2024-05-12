import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    roomId: z.string({
      required_error: "Room id is required",
    }),
    userId: z.string().optional(),
    date: z.string({
      required_error: "Booking date is required",
    }),
    status: z.enum(["Booked", "Cancelled"]).optional(),
  }),
});

const cancelValidation = z.object({
  body: z.object({
    roomId: z.string({
      required_error: "Room id is required",
    })
  }),
});

export const BookingValidation = {
    postValidation,
    cancelValidation
}