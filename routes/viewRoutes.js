const router = require('express').Router();
const { withAuthView } = require('../utils/auth');
const { 
  displayDashboard,
  displayLogin
} = require('../controllers/viewControllers')

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

module.exports = router;