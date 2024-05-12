import { TRoom, TRoomFilterableOptions } from "./room.interfaces";
import { roomFilterAbleField } from "./room.constants";
import { Room } from "./room.model";
import httpStatus from "http-status";
import CustomApiError from "../../../Error/customErrorHandler";
import { IPaginationOptions } from "../../../types/common";
import { PaginationHandler } from "../../../utils/paginationHelper";
import { SortOrder } from "mongoose";

// Create Room in the database
const createRoom = async ( payload: TRoom ) => {
    const result = await Room.create(payload);
    if (!result) {
        throw new CustomApiError(httpStatus.BAD_REQUEST, "Room not created");
    }
    return result;
}

// Get all rooms from the database
const getAllRooms = async (
  options: IPaginationOptions,
  filters: TRoomFilterableOptions
) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } = PaginationHandler(options);
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: roomFilterAbleField.map((field) => ({
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

  const rooms = await Room.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .select("-password");
  const total = await Room.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: rooms,
  };
};

// Get room by id from the database
const getRoomById = async (id: string) => {
    const room = await Room.findById({ _id: id }).populate("booking");
    if (!room) {
        throw new CustomApiError(httpStatus.NOT_FOUND, "Room not found");
    }
    return room;
}

// update room by id
const updateRoomById = async (id: string, payload: TRoom) => {
    const room = await Room.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!room) {
        throw new CustomApiError(httpStatus.NOT_FOUND, "Room not found to update");
    }
    return room;
}

// delete room by id
const deleteRoomById = async (id: string) => {
    const room = await Room.deleteOne({
        _id: id,
    });
    if (!room) {
        throw new CustomApiError(httpStatus.NOT_FOUND, "Room not found to delete");
    }
    return room;
}

export const RoomService = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,
    deleteRoomById,
};

