import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// ---------- Custom Plugin: Only draw percentage labels on slices ----------
const displayPercentages = {
  id: 'displayPercentages',
  afterDatasetsDraw(chart) {
    const datasets = chart.data?.datasets;
    if (!datasets || !datasets[0] || !datasets[0].data) return;

    const { ctx } = chart;
    const dataValues = datasets[0].data;
    const total = dataValues.reduce((a, b) => a + (Number(b) || 0), 0);
    if (total === 0) return;

    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data) return;

    meta.data.forEach((datapoint, index) => {
      const value = Number(dataValues[index]) || 0;
      if (value === 0) return;

      const percentage = (value / total) * 100;
      const label = percentage.toFixed(1) + '%';

      if (percentage > 3) {
        const { x, y } = datapoint.tooltipPosition();
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(label, x, y);
        ctx.restore();
      }
    });
  },
};

// ---------- Kill any stray "center text" plugin globally ----------
const killStrayPlugins = {
  id: 'killStrayPlugins',
  beforeInit(chart) {
    if (!chart.config.options.plugins) chart.config.options.plugins = {};
    // Forcibly disable these common offenders
    chart.config.options.plugins.datalabels = { display: false };
    chart.config.options.plugins.centerText = { display: false };
    chart.config.options.plugins.annotation = { annotations: [] };
  },
};

const PieChart = ({ title, labels = [], data = [], colors, onClick }) => {
  const hasData = labels.length > 0 && data.length > 0 && data.some((v) => Number(v) > 0);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors || [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1',
          '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#06B6D4'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 8,
      },
    ],
  }), [labels, data, colors]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // EXPLICITLY DISABLE all stray plugins
      datalabels: { display: false },
      centerText: { display: false },
      annotation: { annotations: [] },
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: { size: 12, weight: '600', family: 'Inter, system-ui, sans-serif' },
          color: '#334155',
        },
      },
      title: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        titleFont: { size: 13, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, system-ui, sans-serif' },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = Number(context.parsed) || 0;
            const total = context.dataset.data.reduce((a, b) => a + (Number(b) || 0), 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return `  ${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onClick) {
        const index = elements[0].index;
        onClick(labels[index]);
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex-1 relative flex items-center justify-center">
        {hasData ? (
          <Pie
            key={`${labels.join('-')}-${data.join('-')}`}
            data={chartData}
            options={options}
            // ---------- Attach local plugins to this chart only ----------
            plugins={[displayPercentages, killStrayPlugins]}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-sm font-medium">No data available for this selection</p>
            <p className="text-xs mt-1">Try a different filter or clear your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;