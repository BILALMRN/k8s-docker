


export default interface ProductOrder {
  product_id: string;
  admin_id: string;
  user_id: string;
  quantity: number;
  price: number;
  created_at?: Date;
  updated_at?: Date;
  status: string;
}
