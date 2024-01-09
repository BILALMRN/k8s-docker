import ProductOrder from "../type";


interface IOrder {
  getAllOrders(): Promise<ProductOrder[]> ;
  getUserOrderHistory(userId: string): Promise<ProductOrder[]>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
  createOrder(order: ProductOrder): Promise<void> ;
}

export default IOrder;
