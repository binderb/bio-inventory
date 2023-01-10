const router = require('express').Router();

const { withAuthAPI } = require('../../utils/auth');
const {
  getAllSpecs,
} = require('../../controllers/specControllers');

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
// Get all specs
router.route('/').get(getAllSpecs);

module.exports = router;