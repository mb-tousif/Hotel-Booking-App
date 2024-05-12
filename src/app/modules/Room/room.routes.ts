import express from "express";
import AuthenticateUser from "../../middleware/authenticateUser";
import { RoomController } from "./room.controller";
import ZodValidateRequest from "../../middleware/validateZodReq";
import { RoomValidation } from "./room.zod.validation";

const router = express.Router();

router.get("/all-rooms", AuthenticateUser(), RoomController.getAllRooms);

router.post(
  "/create-room",
  AuthenticateUser(),
  ZodValidateRequest(RoomValidation.postValidation),
  RoomController.createRoom
);

export const RoomRoutes = router;
