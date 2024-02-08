import { Request, Response } from "express";
import Product from "../Models/Product";
import productService from "../service/productService";
import IProductService from "../Interface/IProduct";

class ProductController {
  private ProductService: IProductService;

  constructor(ProductService: IProductService) {
    this.ProductService = ProductService;
  }
  public getProducts = async (req: Request, res: Response) => {
    try {
      const adminId: number =Number(req.headers["admin_id"] as string);

      if (!adminId) {
        return res.status(400).send("Invalid 'admin_id' header value");
      }

      const items: Product[] = await this.ProductService.getProducts(adminId);
      res.status(200).send(items);
    } catch (error: any) {
      res.status(500).send("fail getProducts");
    }
  }

  public getProduct = async (req: Request, res: Response) => {
    try {
      const productId: number =Number(req.params.id);

      if (!(productId)) {
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

  public createProduct = async (req: Request, res: Response) => {
    try {
      const item: Product = req.body as Product;
      const newItem: boolean = await this.ProductService.createProduct(item);

      res.status(201).send(newItem);
    } catch (error: any) {
      res.status(500).send("fail createProduct");
    }
  }

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const item: Product = req.body;
      const isUpdate: boolean = await this.ProductService.updateProduct(item);

      res.status(200).send(isUpdate);
    } catch (error: any) {
      res.status(500).send("fail update");
    }
  }

  
  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const productId: number =Number(req.params.id);

      if (!(productId)) {
        return res.status(400).send("Invalid 'id' parameter");
      }

      const isDelete: boolean = await this.ProductService.deleteProduct(productId);
      res.status(204).send(isDelete);
    } catch (error: any) {
      res.status(500).send("fail delete");
    }
  }

  public getAllAvailableProductsInStock = async (req: Request, res: Response) => {
    try {
      const adminId: number = Number(req.headers["admin_id"] as string);
      if (!(adminId)) {
        return res.sendStatus(400);
      }

      const items: Product[] = await this.ProductService.getAllAvailableProductsInStock(adminId);

      if (items.length === 0) {
        return res.status(404).send("No available products in stock");
      }

      res.status(200).send(items);
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Failed to retrieve available products in stock");
    }
  }


  public searchProductFromDB = async (req: Request, res: Response) => {
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

  public getProductsParDiscount = async (req: Request, res: Response) => {
    try {
      const discountPrice: number = Number(req.headers["discount_price"]?.toString());
      if (!(discountPrice)) {
        console.log(discountPrice);
        return res.sendStatus(400);
      }
      const discountedProducts: Product[] = await this.ProductService.getProductsParDiscount(discountPrice);

      if (discountedProducts.length === 0) {
        return res.status(404).send("No products found");
      }

      res.status(200).json(discountedProducts);
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Fail to retrieve discounted products");
    }
  }

  public getSuggestion = async (req: Request, res: Response) => {
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
