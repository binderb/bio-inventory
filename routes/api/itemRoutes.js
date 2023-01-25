import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getOneItem,
  createOneItem,
  updateOneItem,
  deleteOneItem
} from '../../controllers/itemController.js';

// ---------------------
// Public Routes
// ---------------------


// ---------------------
// Authenticated Routes
// ---------------------
router.route('/')
// Create one item
.post(withAuthAPI,createOneItem);

router.route('/:id')
// Get one spec
.get(withAuthAPI,getOneItem)
// Update one spec
// .put(withAuthAPI,updateOneItem)
// Delete one spec
// .delete(withAuthAPI,deleteOneItem);

export default router;