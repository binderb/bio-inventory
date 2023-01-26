import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllVendors,
  createOneVendor
} from '../../controllers/vendorController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Get all vendors
.get(withAuthAPI,getAllVendors)
// Create one vendors
.post(withAuthAPI,createOneVendor);

router.route('/:id')
// Get one spec
// .get(getOneSpec)
// Update one spec
// .put(withAuthAPI,updateOneSpec)
// Delete one spec
// .delete(withAuthAPI,deleteOneSpec);

export default router;