import express from 'express';
const router = express.Router();
import { withAuthView } from '../utils/auth.js';
import { 
  displayDashboard,
  displayLogin
} from '../controllers/viewControllers.js';

// ---------------------
// Public Routes
// ---------------------
// Login view
router.route('/login').get(displayLogin);

// ---------------------
// Authenticated Routes
// ---------------------
// Dashboard view
router.route('/').get(withAuthView, displayDashboard);

export default router;