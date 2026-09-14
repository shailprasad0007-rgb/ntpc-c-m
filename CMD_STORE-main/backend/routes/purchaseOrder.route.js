import express from 'express';
import { getAll } from '../controllers/purchaseOrder.controllers.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll);

export default router;