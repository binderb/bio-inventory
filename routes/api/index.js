import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';
import specRoutes from './specRoutes.js';

router.use('/specs', specRoutes);
router.use('/users', userRoutes);


export default router;