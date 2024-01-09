// routes/orderRoutes.ts
import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/:orderId/status', orderController.updateOrderStatus);
router.get('/:userId/history', orderController.getUserOrderHistory);
router.get('/admin/history', orderController.getAllOrders);

export default router;
