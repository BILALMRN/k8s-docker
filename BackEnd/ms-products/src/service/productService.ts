import IProductService from "../Interface/IProduct";
import DataBase from "../dataBase/pg";
import IDB from "../Interface/IDB";
import Product from "../Models/Product";

class ProductService implements IProductService {
  private database: IDB;

  constructor(database: IDB) {
    this.database = database;
  }

  async createProduct(product: Product): Promise<boolean> {
    return await this.database.createProduct(product);
  }

  async deleteProduct(product_id: number): Promise<boolean> {
    if (!product_id) {
      throw new Error("Invalid product_id");
    }
    try {
      return await this.database.deleteProduct(product_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProduct(product_id: number): Promise<Product> {
    if (!product_id) {
      throw new Error("Invalid product_id");
    }
    try {
      return await this.database.getProduct(product_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProducts(adminUSer_id: number): Promise<Product[]> {
    if (!adminUSer_id) {
      throw new Error("Invalid adminUSer_id");
    }
    try {
      return await this.database.getProducts(adminUSer_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllAvailableProductsInStock(admin_id: number): Promise<Product[]> {
    if (!admin_id ) {
      throw new Error("Invalid admin_id");
    }
    try {
      return await this.database.getAllAvailableProductsInStock(admin_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<boolean> {
    try {
      return await this.database.updateProduct(product);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async searchProductFromDB(nameProduct: string): Promise<Product[]> {
    try {
      return await this.database.searchProductFromDB(nameProduct);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductsParDiscount(discountPrice: number): Promise<Product[]> {
    try {
      return await this.database.getProductsParDiscount(discountPrice);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSuggestion(category: string): Promise<Product[]> {
    try {
      return await this.database.getSuggestion(category);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const productService = new ProductService(DataBase);
export default productService;
