import express from 'express';
const router = express.Router();
import { withAuthView } from '../utils/auth.js';
import { 
  displayDashboard,
  displayLogin,
  displaySpecDetails,
  displayItemDetails
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
router.route('/specs/:id')
.get(withAuthView, displaySpecDetails);
router.route('/specs/:id')
.get(withAuthView, displayItemDetails);

export default router;