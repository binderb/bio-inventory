import express from 'express';
const router = express.Router();
import { withAuthAPI } from '../../utils/auth.js';
import {
  getOneItem,
  createOneItem,
  updateOneItem,
  deleteOneItem,
  getStatuses
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

router.route('/statuses')
// Get enumerations for statuses
.get(withAuthAPI,getStatuses);

router.route('/:id')
// Get one item
.get(withAuthAPI,getOneItem)
// Update one item
.put(withAuthAPI,updateOneItem)
// Delete one item
// .delete(withAuthAPI,deleteOneItem);

export default router;