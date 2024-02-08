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
      const orderData : ProductOrder = req.body as ProductOrder;
      await this.OrderService.createOrder(orderData);
      res.status(201).send('Order created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public updateOrderStatus = async (req: Request, res: Response) => {
    try {
      const { status, orderId } = req.body;
      if (!status || !orderId) {
        res.status(400).send('Invalid status or orderId');
        return;
      }
      await this.OrderService.updateOrderStatus(orderId, status);
      res.send('Order status updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public getUserOrderHistory = async (req: Request, res: Response) => {
    const userId = req.query.user_Id;
    if(!userId){
      res.status(404).send('No id found');
      return;
    }
    try {
      const userOrders = await this.OrderService.getUserOrderHistory(userId as string );
      if (userOrders.length === 0) {
        res.status(404).send('No orders found for this user');
      } else {
        res.status(200).json(userOrders);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while retrieving user order history');
    }
  }

  public getAllOrders = async (req: Request, res: Response) => {
    try {
      const admin_id = req.query.admin_Id;
      if(!admin_id){
        res.status(404).send('No id found');
      }
      const allOrders = await this.OrderService.getAllOrders(admin_id as string);
      if (allOrders.length === 0) {
        res.status(404).send('No orders found');
      } else {
        res.json(allOrders);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving all orders');
    }
  }
}

const orderController = new OrderController(orderService);
export default orderController;
