import { AdminEntity } from "../Model/AdminEntity";
import AccountCreationResponse from "../type";

interface IAdmin {

  createAccount(account: AdminEntity): Promise<AccountCreationResponse>;
  getAccount(user_id: number): Promise<AccountCreationResponse>;
  updateAccount(account: AdminEntity): Promise<AccountCreationResponse>; //update info and password
  deleteAccount(user_id: number): Promise<boolean>;
  loginAccount(username: string,password:string): Promise<string> ;// Authentication successful, return the user_id as string
}

export default IAdmin;
