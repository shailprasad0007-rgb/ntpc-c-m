import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import authRoutes from './routes/auth.route.js';
import poRoutes from './routes/purchaseOrder.route.js';
import statsRoutes from './routes/stats.route.js';
import adminRoutes from './routes/admin.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/purchase-orders', poRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});