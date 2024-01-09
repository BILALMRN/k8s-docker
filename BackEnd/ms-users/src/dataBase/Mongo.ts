import IDB from "../Interface/IDB";
import mongoose, { ConnectOptions } from "mongoose";
import User from "../Models/userShema";
import IUserDocument from "../type";
require("dotenv").config();

class DB implements IDB {
  //
  constructor() {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not set");
    }
    const connectionString: string = process.env.DB_URL;

    mongoose
      .connect(connectionString, {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("db error", error);
        process.exit(1);
      });
  }

  async createAccount(account: IUserDocument): Promise<void> {
    try {
      const existingUser = await User.findOne({ email: account.email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const { id, ...tempUser } = account;
      const user = new User(tempUser);
      await user.save();
      return;
    } catch (error) {
      console.error(error);
      throw new Error("User already exists");
    }
  }
  async getAccount(_id: string): Promise<IUserDocument> {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(_id);

      if (!isValidObjectId) {
        throw new Error("Invalid user_id format");
      }
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(account: IUserDocument): Promise<IUserDocument> {
    try {
      const result = await User.updateOne(
        { email: account.email },
        { $set: account }
      );

      if (result.modifiedCount === 0) {
        // Handle the case where the document with the given email doesn't exist
        throw new Error("User not found");
      }
     
      return account;
    } catch (error) {
      throw error;
    }
  }

  async getAccountByEmail(email: string): Promise<IUserDocument> {
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        // User not found
        throw new Error("email not exists or Invalid");
      }

      // Compare passwords

      return user;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
  async deleteAccount(_id: string): Promise<void> {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(_id);

      if (!isValidObjectId) {
        throw new Error("Invalid user_id format");
      }
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
      // const user = (await User.findById(_id)) as AccountUser;
      // if (!user) {
      //   throw new Error("User not found");
      // }
      await User.findByIdAndDelete(_id);
    } catch (error) {
      throw error;
    }
  }
}

const DataBase = new DB();
export default DataBase;
