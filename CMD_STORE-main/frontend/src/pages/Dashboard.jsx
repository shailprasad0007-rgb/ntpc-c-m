// src/pages/Dashboard.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { poApi } from '../api/poApi';
import DonutChart from '../components/DonutChart';
import KpiCard from '../components/KpiCard';
import { useAuth } from '../context/AuthContext';
import Topbar from '../components/Topbar';

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
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

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return '₹ ' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

// ------------------------------------------------------------
// Main Dashboard
// ------------------------------------------------------------
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [selectedPlantGroup, setSelectedPlantGroup] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedEnqType, setSelectedEnqType] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const poRes = await poApi.getAll({ limit: 5000 });
      setAllPos(poRes.data.data || []);
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
  }, [search]);

  const searchFilteredData = useMemo(() => {
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

  const kpis = useMemo(() => {
    const total = searchFilteredData.length;
    const totalValue = searchFilteredData.reduce((sum, po) => sum + (Number(po.value_inr) || 0), 0);
    const avgDays = total > 0
      ? searchFilteredData.reduce((sum, po) => sum + (Number(po.pr_po_days) || 0), 0) / total
      : 0;
    return {
      total,
      totalValue,
      avgWeeks: avgDays / 7,
      pending: searchFilteredData.filter((po) => deriveStatus(po) === 'Pending').length,
    };
  }, [searchFilteredData]);

  const plantGroupData = useMemo(() => {
    const counts = {};
    searchFilteredData.forEach((po) => {
      const g = getPlantGroup(po.ord_plant);
      if (g && g !== 'Unknown') counts[g] = (counts[g] || 0) + 1;
    });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData]);

  const specificPlantData = useMemo(() => {
    if (!selectedPlantGroup) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData
      .filter((po) => getPlantGroup(po.ord_plant) === selectedPlantGroup)
      .forEach((po) => {
        const code = String(po.ord_plant || '').trim();
        if (code) counts[code] = (counts[code] || 0) + 1;
      });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlantGroup]);

  const enqTypeData = useMemo(() => {
    if (!selectedPlant) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData
      .filter((po) => String(po.ord_plant).trim() === String(selectedPlant).trim())
      .forEach((po) => {
        if (po.enq_type) counts[po.enq_type] = (counts[po.enq_type] || 0) + 1;
      });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlant]);

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

  // ---------- Quick Access cards ----------
  const QUICK_ACCESS = [
    {
      title: 'Time Analysis',
      description: 'PO processing timeline & trends',
      path: '/analysis',
      icon: '⏱',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      hoverBg: 'group-hover:bg-blue-600',
      border: 'border-blue-100',
    },
    {
      title: 'Operational Insights',
      description: 'On-time delivery, pending, high-value stats',
      path: '/insights',
      icon: '📊',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      hoverBg: 'group-hover:bg-purple-600',
      border: 'border-purple-100',
    },
    {
      title: 'Live Purchase Orders',
      description: 'Full table with search & pagination',
      path: '/purchase-orders',
      icon: '📄',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      hoverBg: 'group-hover:bg-emerald-600',
      border: 'border-emerald-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        {/* ===================== TOPBAR ===================== */}
        <div className="mb-5">
          <Topbar />
        </div>

        {/* ===================== LOGIN / LOGOUT ===================== */}
        <div className="mb-5 flex justify-end">
          {user ? (
            <button
              onClick={() => {
                if (window.confirm('Logout karna hai?')) {
                  logout();
                  navigate('/login');
                }
              }}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-rose-600 hover:to-red-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-bold">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-bold">Login</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* ===================== KPI CARDS ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard icon={<span>📄</span>} title="Total Live POs" value={kpis.total.toLocaleString()} change="+12%" subtitle="vs. last month" tone="blue" sparkData={[3, 5, 4, 6, 8, 7, 10]} />
          <KpiCard icon={<span>₹</span>} title="Total PO Value" value={formatCurrency(kpis.totalValue)} change="+8%" subtitle="vs. last month" tone="purple" sparkData={[4, 6, 5, 7, 9, 8, 11]} />
          <KpiCard icon={<span>⏱</span>} title="Average Completion Time" value={`${kpis.avgWeeks.toFixed(1)} Weeks`} change="+18%" subtitle="vs. last month" tone="green" sparkData={[5, 6, 6, 7, 6, 8, 9]} />
          <KpiCard icon={<span>🔔</span>} title="Pending / Attention Required" value={kpis.pending.toString()} change="+3" subtitle="vs. last week" tone="orange" sparkData={[2, 3, 4, 3, 5, 6, 7]} />
        </div>

        {/* ===================== QUICK ACCESS CARDS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {QUICK_ACCESS.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`group flex items-center gap-4 p-5 rounded-2xl border ${item.border} bg-white hover:shadow-lg transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center shrink-0 transition-all duration-300 ${item.hoverBg}`}>
                <span className={`text-2xl ${item.text} group-hover:text-white transition-colors`}>
                  {item.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
              </div>
              <svg className={`w-5 h-5 ${item.text} group-hover:translate-x-1 transition-all shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* ===================== DONUT CHART ===================== */}
        <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
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

          <DonutChart
            labels={
              !selectedPlantGroup ? plantGroupData.labels
                : !selectedPlant ? specificPlantData.labels
                : enqTypeData.labels
            }
            data={
              !selectedPlantGroup ? plantGroupData.data
                : !selectedPlant ? specificPlantData.data
                : enqTypeData.data
            }
            onClick={(label) => {
              if (!selectedPlantGroup) setSelectedPlantGroup(label);
              else if (!selectedPlant) setSelectedPlant(label);
              else setSelectedEnqType(label);
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;