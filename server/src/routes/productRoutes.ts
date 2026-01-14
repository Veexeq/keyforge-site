import express from 'express';
import { 
  getProducts, getProductById, getCategories, 
  getAdminProducts, createProduct, updateProduct, deleteProduct, 
  updateProductStatus, getProductDetailsAdmin, updateVariantStock 
} from '../controllers/productController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);

// Admin
router.get('/admin/products', authenticateToken, authorizeAdmin, getAdminProducts);
router.post('/admin/products', authenticateToken, authorizeAdmin, createProduct);
router.put('/admin/products/:id', authenticateToken, authorizeAdmin, updateProduct);
router.delete('/admin/products/:id', authenticateToken, authorizeAdmin, deleteProduct);

router.patch('/admin/products/:id/status', authenticateToken, authorizeAdmin, updateProductStatus);
router.get('/admin/products/:id/details', authenticateToken, authorizeAdmin, getProductDetailsAdmin);
router.patch('/admin/variants/:variantId/stock', authenticateToken, authorizeAdmin, updateVariantStock);

export default router;
