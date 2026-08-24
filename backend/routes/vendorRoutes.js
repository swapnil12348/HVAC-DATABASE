import express from 'express';
// Make sure to import BOTH controllers now:
import { getVendors, createVendor } from '../controllers/vendorController.js';

const router = express.Router();

router.get('/', getVendors);       // To READ data
router.post('/', createVendor);    // To CREATE data

export default router;