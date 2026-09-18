// src/components/EditPOModal.jsx
import { useState } from 'react';
import { poApi } from '../api/poApi';

const EditPOModal = ({ po, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...po });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    
    try {
      await poApi.updatePO(po.id, formData);
      onSave(); // Trigger refresh in Dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update record.');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Edit Purchase Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          
          <form id="edit-po-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1">PO Number (Read Only)</label>
              <input type="text" value={formData.po_no || ''} disabled className="w-full px-3 py-2 bg-gray-100 border rounded-lg text-sm text-gray-500 cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Creator Name</label>
              <input type="text" name="creator_name" value={formData.creator_name || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Agency</label>
              <input type="text" name="agency" value={formData.agency || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Value (INR)</label>
              <input type="number" step="0.01" name="value_inr" value={formData.value_inr || 0} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Enq Type</label>
              <input type="text" name="enq_type" value={formData.enq_type || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Ord. Plant Code</label>
              <input type="text" name="ord_plant" value={formData.ord_plant || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1">Name of Work</label>
              <textarea name="name_of_work" rows="3" value={formData.name_of_work || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">Cancel</button>
          <button type="submit" form="edit-po-form" disabled={isSaving} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditPOModal;