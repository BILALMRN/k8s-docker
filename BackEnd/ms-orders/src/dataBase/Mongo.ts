// database.ts
import mongoose, { ConnectOptions } from 'mongoose';
import IDB from '../Interface/IDB';
import OrderModel from '../Models/ProductOrderModel';
import * as dotenv from 'dotenv';
import ProductOrder from '../type';

dotenv.config();

class DB implements IDB {
  constructor() {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not set');
    }
    const connectionString: string = process.env.DB_URL;

    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log('Database connected');
      })
      .catch((error) => {
        console.log('db error', error);
        process.exit(1);
      });
  }
  async createOrder(order: ProductOrder): Promise<void> {
    try {
      const newOrder = new OrderModel(order);
      await newOrder.save();
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    try {
      await OrderModel.findByIdAndUpdate(orderId, { status });
    } catch (error) {
      throw error;
    }
  }

  async getUserOrderHistory(userId: string): Promise<ProductOrder[]> {
    try {
      const orders = await OrderModel.find({ userId });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(): Promise<ProductOrder[]> {
    try {
      const orders = await OrderModel.find();
      return orders;
    } catch (error) {
      throw error;
    }
  }
}

const DataBase = new DB();
export default DataBase;
