import { Request, Response } from "express";
import Product from "../Models/Product";
import productService from "../service/productService";
import IProductService from "../Interface/IProduct";

class ProductController {
  private ProductService: IProductService;

  constructor(ProductService: IProductService) {
    this.ProductService = ProductService;
  }
  async getProducts(req: Request, res: Response){
    try {
      const adminUserId: number = parseInt(req.headers["i"] as string, 10);

      if (isNaN(adminUserId)) {
        return res.status(400).send("Invalid 'i' header value");
      }

      const items: Product[] = await this.ProductService.getProducts(adminUserId);
      res.status(200).send(items);
    } catch (error: any) {
      res.status(500).send("fail getProducts");
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const productId: number = parseInt(req.params.id, 1);

      if (isNaN(productId)) {
        return res.status(400).send("Invalid 'id' parameter");
      }

      const item: Product = await this.ProductService.getProduct(productId);

      if (!item) {
        return res.status(404).send("Item not found");
      }

      res.status(200).send(item);
    } catch (error: any) {
      res.status(500).send("fail getProduct");
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const item: Product = req.body;
      const newItem: boolean = await this.ProductService.createProduct(item);

      res.status(201).send(newItem);
    } catch (error: any) {
      res.status(500).send("fail createProduct");
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId: number = parseInt(req.params.id, 10);

      if (isNaN(productId)) {
        return res.status(400).send("Invalid 'id' parameter");
      }

      await this.ProductService.deleteProduct(productId);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).send("fail delete");
    }
  }

  async getAllAvailableProductsInStock(req: Request, res: Response) {
    try {
      const adminId: number = parseInt(req.headers["i"] as string, 1);

      if (isNaN(adminId)) {
        return res.status(400).send("Invalid 'i' header value");
      }

      const items: Product[] = await this.ProductService.getAllAvailableProductsInStock(adminId);
      res.status(200).send(items);
    } catch (error: any) {
      res.status(500).send("fail getAllAvailableProductsInStock");
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const item: Product = req.body;
      const newItem: boolean = await this.ProductService.updateProduct(item);

      if (!newItem) {
        return res.status(404).send("Item not found");
      }

      res.status(200).send(item);
    } catch (error: any) {
      res.status(500).send("fail update");
    }
  }


  async searchProductFromDB(req: Request, res: Response) {
    try {
      const nameProduct: string = req.params.nameProduct; // Adjust accordingly based on your route configuration
      const products: Product[] = await this.ProductService.searchProductFromDB(nameProduct);

      if (products.length === 0) {
        return res.status(404).send("Products not found");
      }

      res.status(200).json(products);
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Fail to retrieve products");
    }
  }

  async getProductsParDiscount(_req: Request, res: Response) {
    try {
      const discountedProducts: Product[] = await this.ProductService.getProductsParDiscount();

      if (discountedProducts.length === 0) {
        return res.status(404).send("No products found");
      }

      res.status(200).json(discountedProducts);
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Fail to retrieve discounted products");
    }
  }

  async getSuggestion(req: Request, res: Response) {
    try {
      const category: string = req.params.category; // Adjust accordingly based on your route configuration
      const suggestedProducts: Product[] = await this.ProductService.getSuggestion(category);

      if (suggestedProducts.length === 0) {
        return res.status(404).send("No suggested products found");
      }

      res.status(200).json(suggestedProducts);
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Fail to retrieve suggested products");
    }
  }
}

const productController = new ProductController(productService);
export default productController;
