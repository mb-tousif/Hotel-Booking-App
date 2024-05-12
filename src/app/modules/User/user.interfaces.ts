import { Model } from "mongoose";

export type TUserFilterableOptions = {
    search?: string;
}

export type TUser = {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  role: string;
  gender?: string;
  contactNo?: string;
  address?: string;
  booking?: string[];
};

export type UserModel = {
  comparePassword(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;
