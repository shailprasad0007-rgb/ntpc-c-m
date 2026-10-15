// src/config/charts.js

export const getPlantGroup = (code) => {
  const c = String(code || '').trim();
  if (c === '1079' || c === '2401') return 'CBCMP';
  if (c === '1078' || c === '2404') return 'KDCMP';
  return c || 'Unknown';
};

export const CHART_CONFIGS = [
  {
    id: 'plant-group',
    title: 'Order Plant Group',
    subtitle: 'CBCMP vs KDCMP',
    icon: '🏭',
    color: '#3B82F6',
    getData: (pos) => {
      const counts = {};
      pos.forEach((po) => {
        const g = getPlantGroup(po.ord_plant);
        if (g && g !== 'Unknown') counts[g] = (counts[g] || 0) + 1;
      });
      return { labels: Object.keys(counts), data: Object.values(counts) };
    },
    filterPOs: (pos, selection) =>
      pos.filter((po) => getPlantGroup(po.ord_plant) === selection),
  },
  {
    id: 'enq-type',
    title: 'Enquiry Type',
    subtitle: 'STE, LTE, OTE, MOU & more',
    icon: '📊',
    color: '#8B5CF6',
    getData: (pos) => {
      const counts = {};
      pos.forEach((po) => {
        const t = String(po.enq_type || '').trim();
        if (t && t !== 'Unknown' && t !== 'NA' && t !== 'N/A') {
          counts[t] = (counts[t] || 0) + 1;
        }
      });
      return { labels: Object.keys(counts), data: Object.values(counts) };
    },
    filterPOs: (pos, selection) =>
      pos.filter((po) => String(po.enq_type || '').trim() === selection),
  },
  {
    id: 'lead-time-bucket',
    title: 'PO Lead Time',
    subtitle: 'Fast / Medium / Slow',
    icon: '⏱',
    color: '#10B981',
    getData: (pos) => {
      let fast = 0, medium = 0, slow = 0;
      pos.forEach((po) => {
        const d = parseFloat(po.pr_po_days) || 0;
        if (d < 30) fast++;
        else if (d <= 60) medium++;
        else slow++;
      });
      return {
        labels: ['Fast (<30d)', 'Medium (30-60d)', 'Slow (>60d)'],
        data: [fast, medium, slow],
      };
    },
    filterPOs: (pos, selection) =>
      pos.filter((po) => {
        const d = parseFloat(po.pr_po_days) || 0;
        if (selection === 'Fast (<30d)') return d < 30;
        if (selection === 'Medium (30-60d)') return d >= 30 && d <= 60;
        return d > 60;
      }),
  },
  {
    id: 'estimate-vs-award',
    title: 'Estimate vs Award',
    subtitle: 'Coming soon',
    icon: '💰',
    color: '#F59E0B',
    comingSoon: true,
  },
];