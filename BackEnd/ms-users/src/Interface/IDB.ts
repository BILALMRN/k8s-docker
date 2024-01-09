import IUserDocument from "../type";


interface IDB{
  //crud
  createAccount(account: IUserDocument): Promise<void>;
  getAccount(user_id: string): Promise<IUserDocument>;
  updateAccount(account: IUserDocument): Promise<IUserDocument>; //update info and password
  deleteAccount(user_id: string): Promise<void>;
  getAccountByEmail(email: string): Promise<IUserDocument>;
}

export default IDB;
