import express, { Request, Response } from "express";
import stockService from "../service/stockService";

const itemsRouter = express.Router();

// PuT /items
itemsRouter.put("/user", async (req: Request, res: Response) => {
  try {
    if (!req.headers.hasOwnProperty("product_id")) {
      return res.status(400).send("Invalid product_id");
    }
    if (typeof req.headers["product_id"] === "string") {
      const product_id: number = Number(req.headers["product_id"]);
      if (isNaN(product_id)) {
        return res.status(400).send("Invalid product_id");
      }
      const isStockUpdated: boolean = await stockService.updateStockProduct(product_id);
      res.status(201).send(isStockUpdated);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

itemsRouter.put("/admin", async (req: Request, res: Response) => {
  try {
    const product_id: number = Number(req.body.product_id);
    const newQuantity: number = Number(req.body.newStock);

    if (isNaN(product_id) || isNaN(newQuantity)) {
      return res.status(400).send("Invalid input");
    }

    const isStockUpdated: boolean = await stockService.updateStockProductAdmin(product_id, newQuantity);
    res.status(201).send(isStockUpdated);

  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default itemsRouter;
