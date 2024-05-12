import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { RoomRoutes } from "../modules/Room/room.routes";

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
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;