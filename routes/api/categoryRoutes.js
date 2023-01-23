import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getAllCategories
} from '../../controllers/categoryController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Get all specs
.get(withAuthAPI,getAllCategories)
// Create one spec
// .post(withAuthAPI,createOneSpec);

router.route('/:id')
// Get one spec
// .get(getOneSpec)
// Update one spec
// .put(withAuthAPI,updateOneSpec)
// Delete one spec
// .delete(withAuthAPI,deleteOneSpec);

export default router;