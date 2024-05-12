import { Model } from "mongoose";

export type TRoomFilterableOptions = {
    search?: string;
    roomNo?: string;
    occupancy?: number;
    price?: number;
    category?: string;
    status?: string;
}

export type TRoom = {
    _id?: string;
    roomNo: string;
    occupancy: number;
    price: number;
    category: string;
    amenities?: string[];
    status?: string;
    booking?: string[];
};

export type RoomModel = Model<TRoom, Record<string, unknown>>;