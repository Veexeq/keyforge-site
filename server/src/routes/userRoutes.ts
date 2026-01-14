import express from 'express';
import { 
  getProfile, updateProfile, changePassword, 
  addAddress, deleteAddress, getAllUsers, deleteUser 
} from '../controllers/userController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';
import prisma from '../config/prisma';

const router = express.Router();

// Profile
router.get('/profile', authenticateToken, getProfile);
router.put('/profile/details', authenticateToken, updateProfile);
router.put('/profile/password', authenticateToken, changePassword);
router.post('/profile/addresses', authenticateToken, addAddress);
router.delete('/profile/addresses/:id', authenticateToken, deleteAddress);

// Admin
router.get('/admin/users', authenticateToken, authorizeAdmin, getAllUsers);
router.delete('/admin/users/:id', authenticateToken, authorizeAdmin, deleteUser);

export default router;
