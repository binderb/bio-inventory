import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllSpecs,
  getOneSpec,
  createOneSpec,
  updateOneSpec,
  deleteOneSpec,
  getUnits,
  getNextPN
} from '../../controllers/specController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Get all specs
.get(withAuthAPI,getAllSpecs)
// Create one spec
.post(withAuthAPI,createOneSpec);

router.route('/units')
// Get enumerations for units
.get(withAuthAPI,getUnits);

router.route('/next-pn')
// Get enumerations for units
.get(withAuthAPI,getNextPN);

router.route('/:id')
// Get one spec
.get(withAuthAPI,getOneSpec)
// Update one spec
.put(withAuthAPI,updateOneSpec)
// Delete one spec
.delete(withAuthAPI,deleteOneSpec);

export default router;