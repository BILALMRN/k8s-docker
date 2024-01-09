


export default interface ProductOrder {
  product_order_id: number;
  product_id: number;
  admin_id: number;
  user_id: number;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  status: string;
}
