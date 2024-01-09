import express from "express";
import productController from "../Controlers/productController";

const itemsRouter = express.Router();

/// GET /products
itemsRouter.get("/", productController.getProducts);

// GET /products/:id
itemsRouter.get("/:id", productController.getProduct);

// POST /products
itemsRouter.post("/", productController.createProduct);

// DELETE /products/:id
itemsRouter.delete("/:id", productController.deleteProduct);

// GET /products/inStock
itemsRouter.get("/inStock", productController.getAllAvailableProductsInStock);

// Route for searchProductFromDB
itemsRouter.get('/search/:nameProduct', productController.searchProductFromDB);

// Route for getProductsParDiscount
itemsRouter.get('/discounted', productController.getProductsParDiscount);

// Route for getSuggestion
itemsRouter.get('/suggestion/:category', productController.getSuggestion);



export default itemsRouter;
