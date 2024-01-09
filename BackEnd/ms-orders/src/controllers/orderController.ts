// controllers/orderController.ts
import { Request, Response } from 'express';
import orderService from '../dataBase/Mongo';
import ProductOrder from '../type';

class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData = req.body as ProductOrder;
      await orderService.createOrder(orderData);
      res.status(201).send('Order created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status,orderId } = req.body;
      await orderService.updateOrderStatus(orderId, status);
      res.send('Order status updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getUserOrderHistory(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const userOrders = await orderService.getUserOrderHistory(userId);
      res.json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllOrders(_req: Request, res: Response): Promise<void> {
    try {
      const allOrders = await orderService.getAllOrders();
      res.json(allOrders);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

const orderController = new OrderController();
export default orderController;
