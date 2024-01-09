import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { AdminEntity } from '../Model/AdminEntity';
import * as dotenv from 'dotenv';
import IDB from "../Interface/IDB";

dotenv.config();
class DB implements IDB {
  private connection: DataSource;
  private adminRepository!: Repository<AdminEntity>;

  constructor() {
    this.connection = new DataSource({
      type: 'postgres',
      url: process.env.CONNECTION_STRING_POSTGRES_SQL,
      entities: [AdminEntity],
      synchronize: true,
    });
    this.connection.initialize()
    .then(() => {
        // here you can start to work with your database
        this.adminRepository = this.connection.getRepository(AdminEntity);
        console.log('Connected to the database');
    })
    .catch((error: any) => {
      throw error;
    });
  }
  async getAccountByUserName(username: string): Promise<AdminEntity> {
      try {
          // Find the user by email
          const admin = await this.adminRepository.findBy({ username:  username});

          if (admin.length === 0) {
            return new AdminEntity();
          }

          return admin[0];
      } catch (error: any) {
          console.error(error.message);
          throw error;
      }
  }


  async createAccount(Account: AdminEntity): Promise<AdminEntity> {
    try {
      const admin = this.adminRepository.create(Account);
      return await this.adminRepository.save(admin);
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getAccount(admin_id: number): Promise<AdminEntity> {
    const admin = await this.adminRepository.findBy({admin_id : admin_id});
    if (admin.length === 0) {
      return new AdminEntity();
    }
    return admin[0];
  }

  async updateAccount(account: AdminEntity): Promise<AdminEntity> {
    await this.adminRepository.update(account.admin_id, account);
    return account;
  }

  async deleteAccount(admin_id: number): Promise<boolean> {
    await this.adminRepository.delete(admin_id);
    return true;
  }


}

const DataBase: DB = new DB();

export default DataBase;