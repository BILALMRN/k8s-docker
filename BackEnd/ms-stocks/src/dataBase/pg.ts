import { Pool } from "pg";
import IDB from "../Interface/IDB";
import dotenv from "dotenv";
dotenv.config();

class DB implements IDB {
  pool: Pool;
  constructor() {
    if (!process.env.CONNECTION_STRING_POSTGRES_SQL) {
      throw new Error("No db environment variable");
    }
    const connectionString: string = process.env.CONNECTION_STRING_POSTGRES_SQL;

    this.pool = new Pool({
      connectionString,
    });
  }

  async connect(): Promise<void> {
    await this.pool.connect();
    console.log("Connected to the database");
  }

  async updateStockProduct(product_id: number): Promise<boolean> {
    try {
      await this.pool.query(
        "UPDATE products SET stock = (stock - 1) WHERE product_id = $1 AND stock >= 1",
        [product_id]
      );
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async updateStockProductAdmin(product_id: number, quantity: number): Promise<boolean> {
    try {
      await this.pool.query(
        "UPDATE products SET stock = $1 WHERE product_id = $2 AND stock >= 0",
        [quantity, product_id]
      );
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

const DataBase: DB = new DB();

export default DataBase;
