import "reflect-metadata";
import { DataSource, Repository, MoreThan } from "typeorm";

import Product from '../Models/Product';
import * as dotenv from 'dotenv';
import IDB from "../Interface/IDB";

dotenv.config();
class DB implements IDB {
  private connection: DataSource;
  private productRepository!: Repository<Product>;

  constructor() {
    this.connection = new DataSource({
      type: 'postgres',
      url: process.env.CONNECTION_STRING_POSTGRES_SQL,
      entities: [Product],
      synchronize: true,
    });
    this.connection.initialize()
    .then(() => {
        // here you can start to work with your database
        this.productRepository = this.connection.getRepository(Product);
        console.log('Connected to the database');
    })
    .catch((error: any) => {
      throw error;
    });
  }

  async createProduct(product: Product): Promise<boolean> {
    try {
      await this.productRepository.save(product);
      return true;
    } catch (error) {
      console.error('Error creating product', error);
      throw error;
    }
  }

  async deleteProduct(product_id: number): Promise<void> {
    try {
      await this.productRepository.delete(product_id);
    } catch (error) {
      console.error('Error deleting product', error);
      throw error;
    }
  }

  async getProduct(product_id: number): Promise<Product> {
    try {
      if (!Number.isInteger(product_id) || product_id <= 0) {
        throw new Error('Invalid product_id');
      }
      const product = await this.productRepository.find({ where:{ product_id: product_id }});
      if (!product) {
        return new Product();
      }
      return product[0];
    } catch (error) {
      console.error('Error retrieving product', error);
      throw error;
    }
  }

  async getProducts(admin_id: number): Promise<Product[]> {
    try {
      return await this.productRepository.find({ where: {  admin: { admin_id: admin_id } } });
    } catch (error) {
      console.error('Error retrieving products', error);
      throw error;
    }
  }

  async getAllAvailableProductsInStock(admin_id: number): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        where: { admin: { admin_id: admin_id }, stock: MoreThan(0) },
      });
    } catch (error) {
      console.error('Error retrieving available products in stock', error);
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<boolean> {
    try {
      await this.productRepository.save(product);
      return true;
    } catch (error) {
      console.error('Error updating product', error);
      throw error;
    }
  }



  async searchProductFromDB(nameProduct: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.createQueryBuilder('product')
        .where("product.name_product LIKE :name OR product.description LIKE :description", { name: `%${nameProduct}%`, description: `%${nameProduct}%` })
        .getMany();
  
      return products;
    } catch (error) {
      console.error('Error searching for products', error);
      throw error;
    }
  }

  async getProductsParDiscount(): Promise<Product[]> {
    try {
      const products = await this.productRepository.createQueryBuilder('product')
        .where("product.price < :price", { price: 100 })
        .getMany();
  
      return products;
    } catch (error) {
      console.error('Error retrieving discounted products', error);
      throw error;
    }
  }

  async getSuggestion(category: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.createQueryBuilder('product')
        .where("product.description LIKE :description OR product.category.name LIKE :category", { description: `%${category}%`, category })
        .limit(10)
        .getMany();
  
      return products;
    } catch (error) {
      console.error('Error getting product suggestions', error);
      throw error;
    }
  }

  
  
}

const DataBase: DB = new DB();

export default DataBase;