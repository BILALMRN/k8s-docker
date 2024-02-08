import ProductOrder from "../type";

interface IDB{
  getAllOrders(admin_id : string): Promise<ProductOrder[]> ;
  getUserOrderHistory(userId: string): Promise<ProductOrder[]>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
  createOrder(order: ProductOrder): Promise<void> ;
}

export default IDB;
