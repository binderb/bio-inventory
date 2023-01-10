const router = require('express').Router();
const { withAuthAPI } = require('../../utils/auth');
const {
  loginUser,
  logoutUser
} = require('../../controllers/userControllers');

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

module.exports = router;