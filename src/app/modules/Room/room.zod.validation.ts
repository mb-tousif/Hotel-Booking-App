import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    roomNo: z.enum([
      "S101",
      "S102",
      "S103",
      "S104",
      "S105",
      "D201",
      "D202",
      "D203",
      "D204",
      "D205",
      "F301",
      "F302",
      "F303",
      "F304",
      "F305",
      "SU401",
      "SU402",
      "SU403",
      "SU404",
      "SU405",
    ]),
    occupancy: z.number({
      required_error: "Occupancy Pax is required",
    }),
    price: z.number({
      required_error: "Room price is missing",
    }),
    category: z.enum(["Single", "Double", "Family", "Suite"]),
    amenities: z
      .enum([
        "Complementary Breakfast",
        "Free Wifi",
        "Swimming Pool",
        "Gym",
        "Parking",
        "Airport Pick up",
        "Airport Drop",
        "Laundry",
        "Spa",
        "Bar",
        "Restaurant",
      ])
      .optional(),
    status: z
      .enum(["Out of Order", "Ready", "Checked In", "Checked Out", "Booked"])
      .optional(),
    booking: z.string().optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    roomNo: z
      .enum([
        "S101",
        "S102",
        "S103",
        "S104",
        "S105",
        "D201",
        "D202",
        "D203",
        "D204",
        "D205",
        "F301",
        "F302",
        "F303",
        "F304",
        "F305",
        "SU401",
        "SU402",
        "SU403",
        "SU404",
        "SU405",
      ])
      .optional(),
    occupancy: z.number().optional(),
    price: z.number().optional(),
    category: z.enum(["Single", "Double", "Family", "Suite"]).optional(),
    amenities: z
      .enum([
        "Complementary Breakfast",
        "Free Wifi",
        "Swimming Pool",
        "Gym",
        "Parking",
        "Airport Pick up",
        "Airport Drop",
        "Laundry",
        "Spa",
        "Bar",
        "Restaurant",
      ])
      .optional(),
    status: z
      .enum(["Out of Order", "Ready", "Checked In", "Checked Out", "Booked"])
      .optional(),
    booking: z.string().optional(),
  }),
});

export const RoomValidation = {
  postValidation,
  updateValidation,
};
