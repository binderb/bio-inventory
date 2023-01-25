import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllTopLevelLocations,
  getAllChildLocations
} from '../../controllers/locationController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/top')
// Get all top-level locations
.get(withAuthAPI,getAllTopLevelLocations);

router.route('/:id/children')
// Get all top-level locations
.get(withAuthAPI,getAllChildLocations);

export default router;