import express from 'express';
import { getEnqTypeStats } from '../controllers/stats.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/enq-type',  getEnqTypeStats);

export default router;