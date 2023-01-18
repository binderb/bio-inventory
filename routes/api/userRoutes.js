import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  loginUser,
  logoutUser
} from '../../controllers/userControllers.js';

// ---------------------
// Public Routes
// ---------------------
// Log in user
router.route('/login').post(loginUser);

// ---------------------
// Authenticated Routes
// ---------------------
// Log out user
router.route('/logout').post(withAuthAPI, logoutUser);

export default router;