import { Request, Response } from 'express';
import AsyncHandler from '../../../utils/asyncHandler';
import { RoomService } from './room.service';
import httpStatus from 'http-status';
import ResponseHandler from '../../../utils/responseHandler';
import { paginationFields } from '../../../types/common';
import { roomFilterAbleField } from './room.constants';
import {HandleQuery} from '../../../utils/handleQuery';

const createRoom = AsyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const room = await RoomService.createRoom(payload);

    ResponseHandler(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Room created successfully",
        data: room
    });
});

// get all rooms
const getAllRooms = AsyncHandler(async (req: Request, res: Response) => {
    const options = HandleQuery(req.query, paginationFields);
    const filters = HandleQuery(req.query, roomFilterAbleField);
    const rooms = await RoomService.getAllRooms(options, filters);

    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Rooms retrieved successfully",
        data: rooms
    });
});

// Get room by id
const getRoomById = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const room = await RoomService.getRoomById(id);

    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room retrieved successfully",
        data: room
    });
});

// Update room by id
const updateRoomById = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const room = await RoomService.updateRoomById(id, payload );

    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room updated successfully",
        data: room
    });
});

// Delete room by id
const deleteRoomById = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await RoomService.deleteRoomById(id);

    ResponseHandler(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room deleted successfully"
    });
});

export const RoomController = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,
    deleteRoomById
};

