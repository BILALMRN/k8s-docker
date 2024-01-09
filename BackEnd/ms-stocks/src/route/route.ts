import express from "express";
import stockService from "../controllers/StockController";

const itemsRouter = express.Router();

// PuT /items
itemsRouter.put("/user", stockService.updateStockProductUser );

itemsRouter.put("/admin", stockService.updateStockProductAdmin );

export default itemsRouter;
