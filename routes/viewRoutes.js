import express from 'express';
const router = express.Router();
import { withAuthView } from '../utils/auth.js';
import { 
  displayDashboard,
  displayExportControls,
  displayLogin,
  displaySpecDetails,
  displayItemDetails,
  displaySpecLogs,
  displayItemLogs
} from '../controllers/viewController.js';

// ---------------------
// Public Routes
// ---------------------
router.route('/login')
// Login view
.get(displayLogin);

// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Dashboard view
.get(withAuthView, displayDashboard);
// Export controls (admin only)
router.route('/export')
.get(withAuthView, displayExportControls);
// Spec details
router.route('/specs/:id')
.get(withAuthView, displaySpecDetails);
// Spec activity log
router.route('/specs/:id/logs')
.get(withAuthView, displaySpecLogs);
// Item details
router.route('/specs/:specid/items/:id')
.get(withAuthView, displayItemDetails);
// Item activity log
router.route('/specs/:specid/items/:id/logs')
.get(withAuthView, displayItemLogs);

export default router;