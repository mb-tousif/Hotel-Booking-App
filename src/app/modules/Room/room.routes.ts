import express from "express";
import AuthenticateUser from "../../middleware/authenticateUser";
import { RoomController } from "./room.controller";
import ZodValidateRequest from "../../middleware/validateZodReq";
import { RoomValidation } from "./room.zod.validation";

const router = express.Router();

router.get("/all-rooms", AuthenticateUser(), RoomController.getAllRooms);

router.get("/:id", AuthenticateUser(), RoomController.getRoomById);

router.post(
  "/create-room",
  AuthenticateUser(),
  ZodValidateRequest(RoomValidation.postValidation),
  RoomController.createRoom
);

router.patch(
  "/:id",
  AuthenticateUser(),
  ZodValidateRequest(RoomValidation.updateValidation),
  RoomController.updateRoomById
);

router.delete("/:id", AuthenticateUser(), RoomController.deleteRoomById);

export const RoomRoutes = router;
