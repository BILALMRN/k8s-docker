import IDataBase from "../Interface/IDB";
import IStockService from "../Interface/IStock";
import DataBase from "../dataBase/pg";

class StockService implements IStockService {
  private dataBase: IDataBase;

  constructor(dataBase: IDataBase) {
    this.dataBase = dataBase;
  }

  async updateStockProduct(product_id: number): Promise<boolean> {
    try {
      if (product_id <= 0 || !Number.isInteger(product_id)) {
        throw new Error("Invalid product_id");
      }
      await this.dataBase.updateStockProduct(product_id);
      return true;
    } catch (error) {
      console.error("Error updating stock product:", error);
      return false;
    }
  }

  async updateStockProductAdmin(product_id: number, quantity: number): Promise<boolean> {
    try {
      if (product_id <= 0 || !Number.isInteger(product_id)) {
        throw new Error("Invalid product_id");
      }
      if (quantity < 0 || !Number.isInteger(quantity)) {
        throw new Error("Invalid quantity");
      }
      await this.dataBase.updateStockProductAdmin(product_id, quantity);
      return true;
    } catch (error) {
      console.error("Error updating stock product admin:", error);
      return false;
    }
  }
}
const stockService = new StockService(DataBase);
export default stockService;
