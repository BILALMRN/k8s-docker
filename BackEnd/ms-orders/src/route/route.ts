// routes/orderRoutes.ts
import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrderStatus);
router.get('/:userId', orderController.getUserOrderHistory);
router.get('/adminhistory', orderController.getAllOrders);

export default router;
