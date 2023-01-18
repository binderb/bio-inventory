import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  loginUser,
  logoutUser
} from '../../controllers/userController.js';

// ---------------------
// Public Routes
// ---------------------
router.route('/login')
// Log in user
.post(loginUser);

// ---------------------
// Authenticated Routes
// ---------------------
router.route('/logout')
// Log out user
.post(withAuthAPI, logoutUser);

export default router;