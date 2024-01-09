import mongoose, { Model, Schema } from "mongoose";
import IUserDocument from "../type";


// Define the User schema
const userSchema = new Schema<IUserDocument>(
  {
    
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Define the User model type 
interface IUserModel extends Model<IUserDocument> {}

// Create the User model
const UserModel = mongoose.model<IUserDocument, IUserModel>("User", userSchema);


export default UserModel;
