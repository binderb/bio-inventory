import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getBioTrackerJSON
} from '../../controllers/adminController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/biotracker')
// Download JSON for migration to Bio-Tracker
.get(withAuthAPI,getBioTrackerJSON);

export default router;