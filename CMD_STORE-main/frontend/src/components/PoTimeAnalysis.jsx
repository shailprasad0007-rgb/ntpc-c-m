import { useMemo, useState } from 'react';
import BarChart from './BarChart';

const TIME_VIEWS = [
  { key: 'weeks', label: 'Weeks' },
  { key: 'months', label: 'Months' },
  { key: 'quarterly', label: 'Quarterly' },
  { key: 'yearly', label: 'Yearly' },
  { key: 'both', label: 'Weeks & Months' },
];

const ENQ_COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6', '#14b8a6'];

const PoTimeAnalysis = ({ pos, compact = false }) => {
  const [timeView, setTimeView] = useState('both');

  const { chartData } = useMemo(() => {
    if (!pos.length) return { chartData: { labels: [], datasets: [] } };

    const byEnqType = {};
    pos.forEach((po) => {
      const type = po.enq_type;
      if (!type || type === 'Unknown') return;
      const days = parseFloat(po.pr_po_days) || 0;
      if (!byEnqType[type]) byEnqType[type] = [];
      byEnqType[type].push(days);
    });

    const enqTypes = Object.keys(byEnqType).sort();
    const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const weeksValues = enqTypes.map((t) => avg(byEnqType[t]) / 7);
    const monthsValues = enqTypes.map((t) => avg(byEnqType[t]) / 30);

    const quarterKey = (dateStr) => {
      const d = new Date(dateStr);
      if (isNaN(d)) return null;
      return `${d.getFullYear()} Q${Math.floor(d.getMonth() / 3) + 1}`;
    };
    const yearKey = (dateStr) => {
      const d = new Date(dateStr);
      return isNaN(d) ? null : d.getFullYear().toString();
    };

    const groupByKey = (keyFn) => {
      const groups = {};
      pos.forEach((po) => {
        const type = po.enq_type;
        if (!type || type === 'Unknown') return;
        const key = keyFn(po.date);
        if (!key) return;
        if (!groups[key]) groups[key] = {};
        if (!groups[key][type]) groups[key][type] = [];
        groups[key][type].push(parseFloat(po.pr_po_days) || 0);
      });
      return groups;
    };

    if (timeView === 'both') {
      return {
        chartData: {
          labels: enqTypes,
          datasets: [
            { label: 'Average (Weeks)', data: weeksValues, backgroundColor: '#3b82f6', borderRadius: 6 },
            { label: 'Average (Months)', data: monthsValues, backgroundColor: '#22c55e', borderRadius: 6 },
          ],
        },
      };
    }
    if (timeView === 'weeks') {
      return {
        chartData: {
          labels: enqTypes,
          datasets: [{ label: 'Average (Weeks)', data: weeksValues, backgroundColor: '#3b82f6', borderRadius: 6 }],
        },
      };
    }
    if (timeView === 'months') {
      return {
        chartData: {
          labels: enqTypes,
          datasets: [{ label: 'Average (Months)', data: monthsValues, backgroundColor: '#22c55e', borderRadius: 6 }],
        },
      };
    }

    const groups = timeView === 'quarterly' ? groupByKey(quarterKey) : groupByKey(yearKey);
    const groupLabels = Object.keys(groups).sort();
    const allTypes = [...new Set(pos.map((p) => p.enq_type).filter((t) => t && t !== 'Unknown'))].sort();

    const datasets = allTypes.map((type, i) => ({
      label: type,
      data: groupLabels.map((g) => {
        const days = groups[g][type] || [];
        if (!days.length) return 0;
        const divisor = timeView === 'quarterly' ? 7 : 30;
        return days.reduce((a, b) => a + b, 0) / days.length / divisor;
      }),
      backgroundColor: ENQ_COLORS[i % ENQ_COLORS.length],
      borderRadius: 6,
    }));

    return { chartData: { labels: groupLabels, datasets } };
  }, [pos, timeView]);

  const yLabel =
    timeView === 'months' || timeView === 'yearly' ? 'Average (Months)' : 'Average (Weeks)';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header with title + tabs */}
      <div className="px-4 py-3 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-800 truncate">PO Completion Performance</h3>
            <p className="text-[10px] text-gray-400 truncate">Average time (Weeks & Months) - Average time from PR to PO completion</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-100 p-0.5 rounded-lg shrink-0">
          {TIME_VIEWS.map((view) => (
            <button
              key={view.key}
              onClick={() => setTimeView(view.key)}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                timeView === view.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-blue-700'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 flex-1">
        <BarChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          yAxisLabel={yLabel}
          xAxisLabel="Enquiry Type"
        />
      </div>
    </div>
  );
};

export default PoTimeAnalysis;