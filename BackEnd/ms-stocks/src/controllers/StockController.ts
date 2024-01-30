import { Request, Response } from 'express';
import stockService from '../service/stockService';
import IStock from '../Interface/IStock';

class StockController {
  private stockService: IStock;

  constructor(stockService: IStock) {
    this.stockService = stockService;
  }

  public updateStockProductUser = async (req: Request, res: Response) => {
    try {
      let product_id: number;
  
      if (req.headers.hasOwnProperty("product_id")) {
        if (typeof req.headers["product_id"] === "string") {
          product_id = Number(req.headers["product_id"]);
  
          if (isNaN(product_id) || product_id <= 0) {
            return res.status(400).send("Invalid product_id");
          }
        } else {
          return res.status(400).send("Invalid product_id");
        }
      } else {
        return res.status(400).send("Invalid product_id");
      }
  
      const isStockUpdated: boolean = await this.stockService.updateStockProduct(product_id);
      res.status(201).send(isStockUpdated);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public updateStockProductAdmin = async (req: Request, res: Response) => {
    try {
      const product_id: number = Number(req.body.product_id);
      const newQuantity: number = Number(req.body.newStock);
  
      if (isNaN(product_id) || isNaN(newQuantity) || product_id <= 0 || newQuantity < 0) {
        return res.status(400).send("Invalid input");
      }
  
      const isStockUpdated: boolean = await this.stockService.updateStockProductAdmin(product_id, newQuantity);
      res.status(201).send(isStockUpdated);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
const stockController = new StockController(stockService);
export default stockController;
