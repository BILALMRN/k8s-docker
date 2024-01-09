import IUserDocument from "../type";


interface IUser {
  //crud
  createAccount(account: IUserDocument): Promise<void>;
  getAccount(user_id: string): Promise<IUserDocument>;
  updateAccount(account: IUserDocument): Promise<IUserDocument>; //update info and password
  deleteAccount(user_id: string): Promise<void>;
  loginAccount(email: string,password:string): Promise<string> ;// Authentication successful, return the user_id as string
}

export default IUser;
