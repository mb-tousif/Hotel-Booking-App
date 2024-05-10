
export type TRoomFilterableOptions = {
    search?: string;
}

export type TRoom = {
    id?: string;
    roomNo: string;
    occupancy: number;
    price: number;
    category: string;
    amenities?: string[];
    status?: string;
    booking?: string[];
};
