import PurchaseOrder from '../models/PurchaseOrder.model.js';

export const getAll = async (req, res) => {
  const { page, limit, enqType, search } = req.query;
  const result = await PurchaseOrder.findAll({ page, limit, enqType, search });
  res.json({
    data: result.data,
    total: result.total,
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 50,
  });
};