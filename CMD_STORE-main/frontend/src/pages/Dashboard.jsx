import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import DonutChart from '../components/DonutChart';
import PoTimeAnalysis from '../components/PoTimeAnalysis';
import KpiCard from '../components/KpiCard';
import OperationalInsights from '../components/OperationalInsights';
import { useAuth } from '../context/AuthContext';
import EditPOModal from '../components/EditPOModal';

const getPlantGroup = (code) => {
  const c = String(code || '').trim();
  if (c === '1079' || c === '2401') return 'CBCMP';
  if (c === '1078' || c === '2404') return 'KDCMP';
  return c || 'Unknown';
};

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

const Dashboard = () => {
  const { user } = useAuth();
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedPlantGroup, setSelectedPlantGroup] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedEnqType, setSelectedEnqType] = useState(null);
  const [editingPO, setEditingPO] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const poRes = await poApi.getAll({ limit: 5000 });
      setAllPos(poRes.data.data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    setSelectedPlantGroup(null);
    setSelectedPlant(null);
    setSelectedEnqType(null);
    setPage(1);
  }, [search]);

  const handleDelete = async (id, poNo) => {
    if (window.confirm(`Delete PO: ${poNo}?`)) {
      setIsDeleting(id);
      try { await poApi.deletePO(id); await fetchData(); }
      catch (err) { alert('Failed: ' + (err.response?.data?.error || err.message)); }
      finally { setIsDeleting(null); }
    }
  };

  const handleSaveEdit = async () => { setEditingPO(null); await fetchData(); };

  const searchFilteredData = useMemo(() => {
    return allPos.filter((po) => {
      const s = search.toLowerCase();
      return !search || String(po.po_no).toLowerCase().includes(s) || po.agency?.toLowerCase().includes(s) || po.name_of_work?.toLowerCase().includes(s);
    });
  }, [allPos, search]);

  const kpis = useMemo(() => {
    const total = searchFilteredData.length;
    const totalValue = searchFilteredData.reduce((sum, po) => sum + (Number(po.value_inr) || 0), 0);
    const avgDays = total > 0 ? searchFilteredData.reduce((sum, po) => sum + (Number(po.pr_po_days) || 0), 0) / total : 0;
    return { total, totalValue, avgWeeks: avgDays / 7, pending: searchFilteredData.filter((po) => deriveStatus(po) === 'Pending').length };
  }, [searchFilteredData]);

  const insights = useMemo(() => {
    const total = searchFilteredData.length;
    const onTime = searchFilteredData.filter((po) => (Number(po.pr_po_days) || 0) <= 30).length;
    return { onTime, onTimePct: total > 0 ? Math.round((onTime / total) * 100) : 0, pending: searchFilteredData.filter((po) => deriveStatus(po) === 'Pending').length, highValue: searchFilteredData.filter((po) => (Number(po.value_inr) || 0) > 1000000).length, mou: searchFilteredData.filter((po) => po.enq_type === 'MOU').length };
  }, [searchFilteredData]);

  const plantGroupData = useMemo(() => {
    const counts = {};
    searchFilteredData.forEach((po) => { const g = getPlantGroup(po.ord_plant); if (g && g !== 'Unknown') counts[g] = (counts[g] || 0) + 1; });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData]);

  const specificPlantData = useMemo(() => {
    if (!selectedPlantGroup) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData.filter((po) => getPlantGroup(po.ord_plant) === selectedPlantGroup).forEach((po) => { const code = String(po.ord_plant || '').trim(); if (code) counts[code] = (counts[code] || 0) + 1; });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlantGroup]);

  const enqTypeData = useMemo(() => {
    if (!selectedPlant) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData.filter((po) => String(po.ord_plant).trim() === String(selectedPlant).trim()).forEach((po) => { if (po.enq_type) counts[po.enq_type] = (counts[po.enq_type] || 0) + 1; });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlant]);

  const tableData = useMemo(() => {
    return searchFilteredData.filter((po) => {
      const mg = !selectedPlantGroup || getPlantGroup(po.ord_plant) === selectedPlantGroup;
      const mp = !selectedPlant || String(po.ord_plant).trim() === String(selectedPlant).trim();
      const me = !selectedEnqType || po.enq_type === selectedEnqType;
      return mg && mp && me;
    });
  }, [searchFilteredData, selectedPlantGroup, selectedPlant, selectedEnqType]);

  const total = tableData.length;
  const paginatedData = tableData.slice((page - 1) * limit, page * limit);

  const getTitle = () => {
    if (!selectedPlantGroup) return 'Order Plant Group Overview';
    if (!selectedPlant) return `Plant Codes for ${selectedPlantGroup}`;
    if (!selectedEnqType) return `Enq Type Distribution - Plant ${selectedPlant}`;
    return `Purchase Orders - ${selectedPlantGroup} / ${selectedPlant} / ${selectedEnqType}`;
  };

  const handleBack = () => {
    if (selectedEnqType) setSelectedEnqType(null);
    else if (selectedPlant) setSelectedPlant(null);
    else setSelectedPlantGroup(null);
  };

  const showBack = selectedPlantGroup || selectedPlant || selectedEnqType;

  const currentDate = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <span className="font-semibold text-blue-700">Home</span><span>›</span><span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <span>{currentDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard icon={<span>📄</span>} iconBg="bg-blue-50" iconColor="text-blue-600" title="Total Live POs" value={kpis.total.toLocaleString()} change="12%" changeType="up" />
          <KpiCard icon={<span>₹</span>} iconBg="bg-indigo-50" iconColor="text-indigo-600" title="Total PO Value" value={formatCurrency(kpis.totalValue)} change="8%" changeType="up" />
          <KpiCard icon={<span>⏱</span>} iconBg="bg-purple-50" iconColor="text-purple-600" title="Average Completion Time" value={`${kpis.avgWeeks.toFixed(1)} Weeks`} change="18%" changeType="down" />
          <KpiCard icon={<span>🔔</span>} iconBg="bg-rose-50" iconColor="text-rose-600" title="Pending / Attention Required" value={kpis.pending.toString()} change="3" changeType="up" />
        </div>

        {/* GRAPH + OPERATIONAL INSIGHT - BAGAL ME */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          <div className="lg:col-span-8 bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
            <PoTimeAnalysis pos={searchFilteredData} compact={true} />
          </div>
          <div className="lg:col-span-4 bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
            <OperationalInsights stats={insights} />
          </div>
        </div>

        {/* PIE CHART AKELE NICHE */}
        <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
          {/* Header row: title LEFT, back button RIGHT */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-gray-800">{getTitle()}</h3>
              <p className="text-[11px] text-gray-400 mt-1">
                Click on a Plant Group to view specific plant codes
              </p>
            </div>
            {showBack && (
              <button
                onClick={handleBack}
                className="shrink-0 px-4 py-2 text-xs bg-gray-900 text-white rounded-full font-bold hover:bg-gray-700 transition"
              >
                ← Back
              </button>
            )}
          </div>

          {/* DonutChart — no title/subtitle props passed */}
          <DonutChart
            labels={!selectedPlantGroup ? plantGroupData.labels : !selectedPlant ? specificPlantData.labels : enqTypeData.labels}
            data={!selectedPlantGroup ? plantGroupData.data : !selectedPlant ? specificPlantData.data : enqTypeData.data}
            onClick={(label) => {
              if (!selectedPlantGroup) setSelectedPlantGroup(label);
              else if (!selectedPlant) setSelectedPlant(label);
              else setSelectedEnqType(label);
            }}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">≡</span> Live Purchase Orders • Total {total} POs
            </h2>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input type="text" placeholder="Search PO No, Agency..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 bg-gray-50 focus:bg-white" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              {showBack && (
                <button onClick={handleBack} className="px-4 py-2 text-xs bg-gray-900 text-white rounded-full font-bold hover:bg-gray-700 transition">← Back</button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
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
                {loading ? <tr><td colSpan={9} className="text-center py-12 text-gray-400">Loading...</td></tr> : paginatedData.length === 0 ? <tr><td colSpan={9} className="text-center py-12 text-gray-400">No records</td></tr> : paginatedData.map((po) => {
                  const status = deriveStatus(po);
                  return (
                    <tr key={po.id} className="hover:bg-blue-50/40 transition">
                      <td className="px-4 py-3 font-bold text-[#0b3d91]">{po.po_no}</td>
                      <td className="px-4 py-3 text-gray-700 truncate max-w-[140px]">{po.creator_name}</td>
                      <td className="px-4 py-3 text-gray-700 truncate max-w-[180px]">{po.agency}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatCurrency(po.value_inr)}</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-100">{po.enq_type || '—'}</span></td>
                      <td className="px-4 py-3 text-center font-semibold">{po.ord_plant || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(po.date)}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusStyles[status]}`}>{status}</span></td>
                      {user?.role === 'admin' && <td className="px-4 py-3 text-right"><div className="flex justify-end gap-2"><button onClick={() => setEditingPO(po)} className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white">✎</button><button onClick={() => handleDelete(po.id, po.po_no)} disabled={isDeleting === po.id} className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white">✕</button></div></td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="text-xs text-gray-500">Showing {total === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}</span>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 disabled:opacity-40">‹</button>
              {Array.from({ length: Math.min(5, Math.ceil(total / limit) || 1) }, (_, i) => {
                const tp = Math.ceil(total / limit) || 1; let s = Math.max(1, page - 2); if (s + 4 > tp) s = Math.max(1, tp - 4); const p = s + i; if (p > tp) return null;
                return <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-full text-xs font-bold ${p === page ? 'bg-[#0b3d91] text-white' : 'bg-white border border-gray-200'}`}>{p}</button>;
              })}
              <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage(p => p + 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 disabled:opacity-40">›</button>
            </div>
          </div>
        </div>

        {editingPO && <EditPOModal po={editingPO} onClose={() => setEditingPO(null)} onSave={handleSaveEdit} />}
      </div>
    </div>
  );
};

export default Dashboard;