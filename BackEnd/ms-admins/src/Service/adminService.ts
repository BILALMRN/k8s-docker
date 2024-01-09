import bcrypt from "bcrypt";
import IAccount from "../Interface/IAccount";
import IDB from "../Interface/IDB";
import { AdminEntity } from "../Model/AdminEntity";
import DataBase from "../Db/pg";
import AccountCreationResponse from "../type";



class Account implements IAccount {
  private database: IDB;

  constructor(database: IDB) {
    this.database = database;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createAccount(account: AdminEntity): Promise<AccountCreationResponse> {
    try {
      const hashedPassword = await this.hashPassword(account.password_hash);
      account.password_hash = hashedPassword;
      const createdAccount = await this.database.createAccount(account);
      return { success: true, account: createdAccount };
    } catch (error: any) {
      console.error('Error creating account:', error.message);
      throw error;
    }
  }

  async getAccount(admin_id: number): Promise<AccountCreationResponse> {
    const Account = await this.database.getAccount(admin_id);
    return {success: true ,account:  Account};
  }

  async updateAccount(account: AdminEntity): Promise<AccountCreationResponse> {
    try {
      // Check if the account exists before updating
      const existingAccount = await this.database.getAccount(account.admin_id);
  
      if (!existingAccount || existingAccount.admin_id !== account.admin_id) {
        throw new Error('Account not found');
      }
      const Account = await this.database.updateAccount(account );
      return { success: true, account: Account };
    } catch (error:any) {
      console.error('Error updating account:', error.message);
      throw error;
    }
  }
  
  async deleteAccount(admin_id: number): Promise<boolean> {
    try {
      // Check if the account exists before deleting
      const existingAccount = await this.database.getAccount(admin_id);
  
      if (!existingAccount || existingAccount.admin_id !== admin_id) {
        throw new Error('Account not found');
      }
  
      return await this.database.deleteAccount(admin_id);
    } catch (error:any) {
      console.error('Error deleting account:', error.message);
      throw error;
    }
  }

  async loginAccount(username: string, password: string): Promise<string> {
    try {
      const user: AdminEntity = await this.database.getAccountByUserName(username);

      if (!user) {
        return 'User not found';
      }

      const passwordMatch = bcrypt.compareSync(password, user.password_hash);

      if (!passwordMatch) {
        return ('Invalid email or password');
      }

      return user.username;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
}

const account = new Account(DataBase);
export default account;
