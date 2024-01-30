// controllers/orderController.ts
import { Request, Response } from 'express';
import orderService from '../dataBase/Mongo';
import ProductOrder from '../type';
import IOrder from '../Interface/IOrder';

class OrderController {

  private OrderService: IOrder;

  constructor(orderService: IOrder) {
    this.OrderService = orderService;
  }

  public createOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body as ProductOrder;
      await this.OrderService.createOrder(orderData);
      res.status(201).send('Order created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public updateOrderStatus = async (req: Request, res: Response) => {
    try {
      const { status,orderId } = req.body;
      await this.OrderService.updateOrderStatus(orderId, status);
      res.send('Order status updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public getUserOrderHistory = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const userOrders = await this.OrderService.getUserOrderHistory(userId);
      res.json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public getAllOrders = async (_req: Request, res: Response) => {
    try {
      const allOrders = await this.OrderService.getAllOrders();
      res.json(allOrders);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

const orderController = new OrderController(orderService);
export default orderController;
