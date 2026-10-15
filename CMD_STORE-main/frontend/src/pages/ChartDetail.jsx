// src/pages/ChartDetail.jsx
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { poApi } from '../api/poApi';
import { CHART_CONFIGS, getPlantGroup } from '../config/charts';
import DonutChart from '../components/DonutChart';

const formatCurrency = (n) =>
  '₹ ' + (Number(n) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

const formatDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  if (isNaN(dt)) return '—';
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// ------------------------------------------------------------
// Helpers for the multi-level Plant Group drill-down
// ------------------------------------------------------------
const buildPlantGroupCounts = (pos) => {
  const counts = {};
  pos.forEach((po) => {
    const g = getPlantGroup(po.ord_plant);
    if (g && g !== 'Unknown') counts[g] = (counts[g] || 0) + 1;
  });
  return { labels: Object.keys(counts), data: Object.values(counts) };
};

const buildPlantCodeCounts = (pos, group) => {
  const counts = {};
  pos
    .filter((po) => getPlantGroup(po.ord_plant) === group)
    .forEach((po) => {
      const code = String(po.ord_plant || '').trim();
      if (code && code !== 'Unknown') counts[code] = (counts[code] || 0) + 1;
    });
  return { labels: Object.keys(counts), data: Object.values(counts) };
};

const buildEnqTypeCounts = (pos, plantCode) => {
  const counts = {};
  pos
    .filter((po) => String(po.ord_plant).trim() === String(plantCode).trim())
    .forEach((po) => {
      const t = String(po.enq_type || '').trim();
      if (t && t !== 'Unknown' && t !== 'NA' && t !== 'N/A') {
        counts[t] = (counts[t] || 0) + 1;
      }
    });
  return { labels: Object.keys(counts), data: Object.values(counts) };
};

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------
const ChartDetail = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drill-down states (only used for plant-group chart)
  const [selectedGroup, setSelectedGroup] = useState(null);   // 'CBCMP' | 'KDCMP'
  const [selectedPlantCode, setSelectedPlantCode] = useState(null); // '1079' | '2401'
  const [selectedEnqType, setSelectedEnqType] = useState(null);      // 'LTE' | 'STE'

  // Generic filter state (for non-plant-group charts)
  const [selectedLabel, setSelectedLabel] = useState(null);

  const config = CHART_CONFIGS.find((c) => c.id === chartId);
  const isPlantGroupChart = chartId === 'plant-group';

  // ---------- Fetch ----------
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await poApi.getAll({ limit: 5000 });
        setAllPos(res.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------- Reset state when chartId changes ----------
  useEffect(() => {
    setSelectedGroup(null);
    setSelectedPlantCode(null);
    setSelectedEnqType(null);
    setSelectedLabel(null);
  }, [chartId]);

  // ---------- Chart data (plant-group = multi-level) ----------
  const chartData = useMemo(() => {
    if (!config?.getData) return { labels: [], data: [] };

    // Special multi-level logic for plant-group
    if (isPlantGroupChart) {
      // Level 1: KDCMP / CBCMP
      if (!selectedGroup) return buildPlantGroupCounts(allPos);

      // Level 2: 1079 / 2401 (within selected group)
      if (!selectedPlantCode) return buildPlantCodeCounts(allPos, selectedGroup);

      // Level 3: LTE / STE / OTE (within selected plant code)
      if (!selectedEnqType) return buildEnqTypeCounts(allPos, selectedPlantCode);

      // Level 4: show only the clicked enq type as a single slice
      const enqCounts = buildEnqTypeCounts(allPos, selectedPlantCode);
      const matchIdx = enqCounts.labels.indexOf(selectedEnqType);
      if (matchIdx >= 0) {
        return {
          labels: [enqCounts.labels[matchIdx]],
          data: [enqCounts.data[matchIdx]],
        };
      }
      return { labels: [], data: [] };
    }

    // Default single-level for other charts
    return config.getData(allPos);
  }, [config, allPos, isPlantGroupChart, selectedGroup, selectedPlantCode, selectedEnqType]);

  // ---------- Filtered POs (final table) ----------
  const filteredPOs = useMemo(() => {
    if (isPlantGroupChart) {
      if (!selectedEnqType) return [];
      return allPos.filter((po) => {
        const matchesGroup = getPlantGroup(po.ord_plant) === selectedGroup;
        const matchesCode = String(po.ord_plant).trim() === String(selectedPlantCode).trim();
        const matchesEnq = String(po.enq_type || '').trim() === selectedEnqType;
        return matchesGroup && matchesCode && matchesEnq;
      });
    }

    if (!selectedLabel || !config?.filterPOs) return [];
    return config.filterPOs(allPos, selectedLabel);
  }, [config, allPos, isPlantGroupChart, selectedGroup, selectedPlantCode, selectedEnqType, selectedLabel]);

  // ---------- Handle chart slice click ----------
  const handleChartClick = (label) => {
    if (isPlantGroupChart) {
      if (!selectedGroup) {
        setSelectedGroup(label); // Level 1 → Level 2
      } else if (!selectedPlantCode) {
        setSelectedPlantCode(label); // Level 2 → Level 3
      } else if (!selectedEnqType) {
        setSelectedEnqType(label); // Level 3 → Level 4 (table)
      }
      return;
    }

    // Default behavior for other charts
    setSelectedLabel((prev) => (prev === label ? null : label));
  };

  // ---------- Reset one level back ----------
  const handleBack = () => {
    if (isPlantGroupChart) {
      if (selectedEnqType) setSelectedEnqType(null);
      else if (selectedPlantCode) setSelectedPlantCode(null);
      else if (selectedGroup) setSelectedGroup(null);
      return;
    }
    setSelectedLabel(null);
  };

  // ---------- Reset all the way ----------
  const handleResetAll = () => {
    setSelectedGroup(null);
    setSelectedPlantCode(null);
    setSelectedEnqType(null);
    setSelectedLabel(null);
  };

  // ---------- Chart title & subtitle ----------
  const getChartTitle = () => {
    if (!isPlantGroupChart) return config?.title || '';

    if (!selectedGroup) return 'Order Plant Group';
    if (!selectedPlantCode) return `Plant Codes · ${selectedGroup}`;
    if (!selectedEnqType) return `Enquiry Types · Plant ${selectedPlantCode}`;
    return `${selectedEnqType} · Plant ${selectedPlantCode}`;
  };

  const getChartSubtitle = () => {
    if (!isPlantGroupChart) {
      return selectedLabel ? `Filtered by: ${selectedLabel}` : config?.subtitle || '';
    }

    if (!selectedGroup) return 'Click a group to view plant codes (CBCMP / KDCMP)';
    if (!selectedPlantCode)
      return `Click a plant code (1079, 2401, etc.) to view enquiry types`;
    if (!selectedEnqType) return 'Click an enquiry type to view all POs';
    return `${filteredPOs.length} POs found`;
  };

  // ---------- Breadcrumb path ----------
  const breadcrumb = [];
  if (isPlantGroupChart) {
    breadcrumb.push({ label: 'All Groups', onClick: () => {} });
    if (selectedGroup) breadcrumb.push({ label: selectedGroup, onClick: () => {
      setSelectedPlantCode(null);
      setSelectedEnqType(null);
    }});
    if (selectedPlantCode) breadcrumb.push({ label: selectedPlantCode, onClick: () => {
      setSelectedEnqType(null);
    }});
    if (selectedEnqType) breadcrumb.push({ label: selectedEnqType, onClick: () => {} });
  }

  const showBackButton = isPlantGroupChart
    ? selectedGroup || selectedPlantCode || selectedEnqType
    : selectedLabel;

  // ---------- Not Found ----------
  if (!config) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-lg font-bold text-gray-800">Chart not found</h1>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-gray-500 hover:text-blue-600 mb-1 flex items-center gap-1 font-semibold"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-gray-800">{getChartTitle()}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{getChartSubtitle()}</p>

          {/* Breadcrumb */}
          {isPlantGroupChart && breadcrumb.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2 text-[11px]">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-gray-300">›</span>}
                  <button
                    onClick={b.onClick}
                    className={`font-semibold hover:underline ${
                      i === breadcrumb.length - 1
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {b.label}
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="px-4 py-2 text-xs bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition"
            >
              ← Back
            </button>
          )}
          {showBackButton && (
            <button
              onClick={handleResetAll}
              className="px-4 py-2 text-xs bg-gray-900 text-white rounded-full font-bold hover:bg-gray-700 transition"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {loading ? (
          <div className="h-72 flex items-center justify-center text-gray-400">
            Loading chart…
          </div>
        ) : (
          <DonutChart
            labels={chartData.labels}
            data={chartData.data}
            onClick={handleChartClick}
          />
        )}
      </div>

      {/* Filtered Table (only shows at final level) */}
      {filteredPOs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">
              {isPlantGroupChart
                ? `${selectedEnqType} POs · Plant ${selectedPlantCode} · `
                : `${selectedLabel} POs · `}
              <span className="text-blue-600">{filteredPOs.length}</span>
            </h2>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">PO No</th>
                  <th className="px-4 py-3 font-semibold">Creator</th>
                  <th className="px-4 py-3 font-semibold">Agency</th>
                  <th className="px-4 py-3 font-semibold text-right">Value</th>
                  <th className="px-4 py-3 font-semibold text-center">Enq Type</th>
                  <th className="px-4 py-3 font-semibold text-center">Plant</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPOs.map((po) => (
                  <tr key={po.id} className="hover:bg-blue-50/40 transition">
                    <td className="px-4 py-2.5 font-mono font-bold text-[#0b3d91]">
                      {po.po_no}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 truncate max-w-[140px]">
                      {po.creator_name || '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 truncate max-w-[180px]">
                      {po.agency || '—'}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold">
                      {formatCurrency(po.value_inr)}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-100">
                        {po.enq_type || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center font-semibold">
                      {po.ord_plant || '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                      {formatDate(po.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty hint when no POs found at final level */}
      {isPlantGroupChart && selectedEnqType && filteredPOs.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">
          No POs found for {selectedEnqType} at plant {selectedPlantCode}
        </div>
      )}
    </div>
  );
};

export default ChartDetail;