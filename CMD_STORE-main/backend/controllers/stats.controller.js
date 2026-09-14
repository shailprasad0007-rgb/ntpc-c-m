import PurchaseOrder from '../models/PurchaseOrder.model.js';

export const getEnqTypeStats = async (req, res) => {
  const stats = await PurchaseOrder.getEnqTypeStats();
  res.json(stats);
};