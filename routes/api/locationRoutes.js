import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllTopLevelLocations,
  getAllChildLocations,
  createOneLocation,
  getTypes
} from '../../controllers/locationController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Create one location.
.post(withAuthAPI,createOneLocation);

router.route('/top')
// Get all top-level locations
.get(withAuthAPI,getAllTopLevelLocations);

router.route('/types')
// Get all enmumerated location types
.get(withAuthAPI,getTypes);

router.route('/:id/children')
// Get all top-level locations
.get(withAuthAPI,getAllChildLocations);

export default router;