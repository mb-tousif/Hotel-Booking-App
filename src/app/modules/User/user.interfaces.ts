
export type TUserFilterableOptions = {
    search?: string;
}

export type TUser = {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role: string;
  gender?: string;
  contactNo?: string;
  address?: string;
  booking?: string[];
};