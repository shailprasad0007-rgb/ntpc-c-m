// src/pages/PurchaseOrders.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import { useAuth } from '../context/AuthContext';
import EditPOModal from '../components/EditPOModal';

const deriveStatus = (po) => {
  if (po.status) return po.status;
  if (!po.ord_plant || !po.agency) return 'Pending';
  const days = parseInt(po.pr_po_days) || 0;
  if (days > 60) return 'In Progress';
  return 'Approved';
};

const statusStyles = {
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return '₹ ' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

const PurchaseOrders = () => {
  const { user } = useAuth();
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [editingPO, setEditingPO] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await poApi.getAll({ limit: 5000 });
      setAllPos(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => { setPage(1); }, [search]);

  const handleDelete = async (id, poNo) => {
    if (window.confirm(`Delete PO: ${poNo}?`)) {
      setIsDeleting(id);
      try {
        await poApi.deletePO(id);
        await fetchData();
      } catch (err) {
        alert('Failed: ' + (err.response?.data?.error || err.message));
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const filtered = useMemo(() => {
    return allPos.filter((po) => {
      const s = search.toLowerCase();
      return (
        !search ||
        String(po.po_no).toLowerCase().includes(s) ||
        po.agency?.toLowerCase().includes(s) ||
        po.name_of_work?.toLowerCase().includes(s)
      );
    });
  }, [allPos, search]);

  const total = filtered.length;
  const paginatedData = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <Link to="/" className="font-semibold text-blue-700 hover:underline">Home</Link>
          <span>›</span>
          <span>Live Purchase Orders</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">≡</span>
              Live Purchase Orders • Total {total} POs
            </h2>
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search PO No, Agency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 bg-gray-50 focus:bg-white"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[900px]">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">PO No</th>
                  <th className="px-4 py-3 font-semibold">Creator</th>
                  <th className="px-4 py-3 font-semibold">Agency</th>
                  <th className="px-4 py-3 font-semibold text-right">Value (INR)</th>
                  <th className="px-4 py-3 font-semibold text-center">Enquiry Type</th>
                  <th className="px-4 py-3 font-semibold text-center">Order Plant</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold text-center">Status</th>
                  {user?.role === 'admin' && <th className="px-4 py-3 font-semibold text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-400">Loading...</td></tr>
                ) : paginatedData.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-400">No records</td></tr>
                ) : (
                  paginatedData.map((po) => {
                    const status = deriveStatus(po);
                    return (
                      <tr key={po.id} className="hover:bg-blue-50/40 transition">
                        <td className="px-4 py-3 font-bold text-[#0b3d91] font-mono text-[11px]">{po.po_no}</td>
                        <td className="px-4 py-3 text-gray-700 truncate max-w-[140px]">{po.creator_name}</td>
                        <td className="px-4 py-3 text-gray-700 truncate max-w-[180px]">{po.agency}</td>
                        <td className="px-4 py-3 text-right font-semibold">{formatCurrency(po.value_inr)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-100">
                            {po.enq_type || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">{po.ord_plant || '—'}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(po.date)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusStyles[status]}`}>
                            {status}
                          </span>
                        </td>
                        {user?.role === 'admin' && (
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingPO(po)}
                                className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                              >✎</button>
                              <button
                                onClick={() => handleDelete(po.id, po.po_no)}
                                disabled={isDeleting === po.id}
                                className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition disabled:opacity-40"
                              >✕</button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <span className="text-xs text-gray-500">
              Showing {total === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}
            </span>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 disabled:opacity-40 hover:bg-gray-100">‹</button>
              {Array.from({ length: Math.min(5, Math.ceil(total / limit) || 1) }, (_, i) => {
                const tp = Math.ceil(total / limit) || 1;
                let s = Math.max(1, page - 2);
                if (s + 4 > tp) s = Math.max(1, tp - 4);
                const p = s + i;
                if (p > tp) return null;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition ${p === page ? 'bg-[#0b3d91] text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}>
                    {p}
                  </button>
                );
              })}
              <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage((p) => p + 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 disabled:opacity-40 hover:bg-gray-100">›</button>
            </div>
          </div>
        </div>

        {editingPO && (
          <EditPOModal po={editingPO} onClose={() => setEditingPO(null)} onSave={async () => { setEditingPO(null); await fetchData(); }} />
        )}
      </div>
    </div>
  );
};

export default PurchaseOrders;