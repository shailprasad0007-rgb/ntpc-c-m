import db from '../db.js';

const PurchaseOrder = {
  // Get all with filters and pagination
  findAll: async ({ page = 1, limit = 50, enqType, search }) => {
    const offset = (page - 1) * limit;
    let query = db('purchase_orders').select('*');

    if (enqType) {
      query = query.where('enq_type', enqType);
    }

    if (search) {
      query = query.where(function() {
        this.where('po_no', 'like', `%${search}%`)
          .orWhere('agency', 'like', `%${search}%`)
          .orWhere('name_of_work', 'like', `%${search}%`);
      });
    }

    const totalResult = await query.clone().count('id as total');
    const total = parseInt(totalResult[0].total, 10);

    const data = await query
      .orderBy('date', 'desc')
      .offset(offset)
      .limit(limit);

    return { data, total };
  },

  // Get Enq Type counts
  getEnqTypeStats: async () => {
    return await db('purchase_orders')
      .select('enq_type')
      .count('* as count')
      .groupBy('enq_type')
      .orderBy('count', 'desc');
  },

  // Delete all and insert many (for upload)
  truncateAndInsert: async (records) => {
    await db('purchase_orders').del();
    if (records.length) {
      await db('purchase_orders').insert(records);
    }
  },

  // Update a record
  update: async (id, data) => {
    const updated = await db('purchase_orders')
      .where({ id })
      .update(data)
      .returning('*');
    return updated[0] || null;
  },

  // Delete a record
  delete: async (id) => {
    const deleted = await db('purchase_orders').where({ id }).del();
    return deleted > 0;
  },
};

export default PurchaseOrder;