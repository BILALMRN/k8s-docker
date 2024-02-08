// models/productOrderSchema.ts
import mongoose, { Schema, Document } from 'mongoose';
import ProductOrder from '../type';



export interface ProductOrderDocument extends Document, ProductOrder {}

const productOrderSchema = new Schema<ProductOrderDocument>(
  {
    product_id: { type: String, required: true },
    admin_id: { type: String, required: true },
    user_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const ProductOrderModel = mongoose.model<ProductOrderDocument>('ProductOrder', productOrderSchema);

export default ProductOrderModel;
