import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllSpecs,
} from '../../controllers/specControllers.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
// Get all specs
router.route('/').get(getAllSpecs);

export default router;