import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { uploadExcel, updatePO, deletePO } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/upload', authenticate, isAdmin, uploadExcel);
router.put('/purchase-orders/:id', authenticate, isAdmin, updatePO);
router.delete('/purchase-orders/:id', authenticate, isAdmin, deletePO);

export default router;