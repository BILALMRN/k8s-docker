import { AdminEntity } from "../Model/AdminEntity";


interface IDB{
  //crud
  createAccount(account: AdminEntity): Promise<AdminEntity>;
  getAccount(user_id: number): Promise<AdminEntity>;
  updateAccount(account: AdminEntity): Promise<AdminEntity>; //update info and password
  deleteAccount(user_id: number): Promise<boolean>;
  getAccountByUserName(email: string): Promise<AdminEntity>;
}

export default IDB;
