import { Document } from "mongoose";

export default interface IUserDocument extends Document {
  password_hash: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  zip: number;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
