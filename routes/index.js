import express from 'express';
const router = express.Router();
import viewRoutes from './viewRoutes.js';
import apiRoutes from './api/index.js';

router.use('/', viewRoutes);
router.use('/api', apiRoutes);

export default router;