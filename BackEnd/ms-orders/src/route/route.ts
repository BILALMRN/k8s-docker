// routes/orderRoutes.ts
import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/', orderController.updateOrderStatus);
router.get('/', orderController.getUserOrderHistory);
router.get('/adminhistory', orderController.getAllOrders);

export default router;
