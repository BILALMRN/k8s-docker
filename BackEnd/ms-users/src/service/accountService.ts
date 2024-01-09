import bcrypt from "bcrypt";
import DataBase from "../dataBase/Mongo";
import IAccountService from "../Interface/IAccountService";
import IDB from "../Interface/IDB";
import IUserDocument from "../type";

class Account implements IAccountService {
  private database: IDB;

  constructor(database: IDB) {
    this.database = database;
  }
  async loginAccount(email: string,password:string): Promise<string> {
    try {
      // Find the user by email
      const user : IUserDocument = await this.database.getAccountByEmail(email);
  
      // Check if the user exists
      if (!user) {
        // User not found
        throw new Error('Invalid email or password');
      }
      let id : string= user.id;
  
      // Compare passwords
      const passwordMatch = await bcrypt.compareSync(password, user.password_hash);
  
      if (!passwordMatch) {
        // Passwords don't match
        id = "-1";
      }
  
      // Authentication successful, return the user_id
      return id;
    } catch (error:any) {
      console.error(error.message);
      throw error;
    }
  }
  async createAccount(account: IUserDocument){
    try {
      const hashedPassword = await bcrypt.hash(account.password_hash, 10);
      account.password_hash = hashedPassword;
      return await this.database.createAccount(account);
    } catch (error: any) {
      console.error("Error creating account:",error);
      if (error.message === "User already exists") {
        throw new Error("User already exists");
      } else {
        throw new Error("Error creating account");
      }
    }
  }

  async getAccount(user_id: string): Promise<IUserDocument> {
    try {
      const account = await this.database.getAccount(user_id);
      return account;
    } catch (error) {
      console.error("Error to get account:", error);
      throw new Error(`Failed to get account`);
    }
  }

  

  async updateAccount(Account: IUserDocument): Promise<IUserDocument> {
    try {
      return await DataBase.updateAccount(Account);
    } catch (error) {
      console.error("Error update account:", error);
      throw new Error(`Failed update account:`);
    }
  }

  async deleteAccount(user_id: string) {
    try {
      await DataBase.deleteAccount(user_id);
    } catch (error) {
      console.error("Error delete account:", error);
      throw new Error(`Failed to delete account: `);
    }
  }
}

const account = new Account(DataBase);

export default account;
