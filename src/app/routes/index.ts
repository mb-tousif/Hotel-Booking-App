import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { RoomRoutes } from "../modules/Room/room.routes";
import { BookingRoutes } from "../modules/Booking/booking.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/rooms",
    routes: RoomRoutes,
  },
  {
    path : "/bookings",
    routes : BookingRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;