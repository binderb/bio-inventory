import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';
import specRoutes from './specRoutes.js';
import itemRoutes from './itemRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import locationRoutes from './locationRoutes.js';
import vendorRoutes from './vendorRoutes.js';
import adminRoutes from './adminRoutes.js';

router.use('/users', userRoutes);
router.use('/specs', specRoutes);
router.use('/items', itemRoutes);
router.use('/categories', categoryRoutes);
router.use('/locations', locationRoutes);
router.use('/vendors', vendorRoutes);
router.use('/admin', adminRoutes)


export default router;