import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';
import specRoutes from './specRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import vendorRoutes from './vendorRoutes.js';

router.use('/specs', specRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/vendors', vendorRoutes);


export default router;