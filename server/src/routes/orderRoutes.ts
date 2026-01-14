import express from 'express';
import { createOrder, getAdminOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public / User
router.post('/orders', createOrder);

// Admin
router.get('/admin/orders', authenticateToken, authorizeAdmin, getAdminOrders);
router.patch('/admin/orders/:id/status', authenticateToken, authorizeAdmin, updateOrderStatus);

export default router;
