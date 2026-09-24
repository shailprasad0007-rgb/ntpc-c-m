import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ---------- LOCAL PLUGIN (NOT globally registered) ----------
// Only attached to this Bar chart via the `plugins` prop below.
// This prevents it from running on PieCharts.
const valueLabelsPlugin = {
  id: 'valueLabels',
  afterDatasetsDraw(chart) {
    const { ctx, data, chartArea } = chart;
    if (!data?.datasets || !chartArea) return;

    data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.hidden) return;

      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        if (value === null || value === undefined || value === 0) return;

        const x = bar.x;
        const y = bar.y;

        // Skip labels that would go above the chart area
        if (y - 30 < chartArea.top) return;

        const text = Number(value).toFixed(1);
        ctx.save();
        ctx.font = 'bold 10px Inter, system-ui, sans-serif';

        const textWidth = ctx.measureText(text).width;
        const pillWidth = textWidth + 12;
        const pillHeight = 18;
        const pillX = x - pillWidth / 2;
        const pillY = y - pillHeight - 6;

        // Pill background (white with shadow)
        ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();

        // Rounded rectangle
        const r = 9;
        ctx.moveTo(pillX + r, pillY);
        ctx.lineTo(pillX + pillWidth - r, pillY);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY, pillX + pillWidth, pillY + r);
        ctx.lineTo(pillX + pillWidth, pillY + pillHeight - r);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY + pillHeight, pillX + pillWidth - r, pillY + pillHeight);
        ctx.lineTo(pillX + r, pillY + pillHeight);
        ctx.quadraticCurveTo(pillX, pillY + pillHeight, pillX, pillY + pillHeight - r);
        ctx.lineTo(pillX, pillY + r);
        ctx.quadraticCurveTo(pillX, pillY, pillX + r, pillY);
        ctx.closePath();
        ctx.fill();

        // Subtle border
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = datasetIndex === 0 ? '#bfdbfe' : '#bbf7d0';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = datasetIndex === 0 ? '#1d4ed8' : '#15803d';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, pillY + pillHeight / 2);

        ctx.restore();
      });
    });
  },
};

const BarChart = ({ labels, datasets, yAxisLabel = 'Average Time', xAxisLabel = 'Enquiry Type' }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 40, bottom: 5, left: 5, right: 5 } },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 16,
          boxWidth: 12,
          boxHeight: 12,
          font: { size: 12, weight: '600', family: 'Inter, system-ui, sans-serif' },
          color: '#334155',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        titleFont: { size: 13, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, system-ui, sans-serif' },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          label: (context) => `  ${context.dataset.label}: ${context.parsed.y.toFixed(1)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#334155',
          font: { size: 12, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
        },
        title: {
          display: true,
          text: xAxisLabel,
          color: '#1e293b',
          font: { size: 12, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
          padding: { top: 10 },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
        border: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 11, family: 'Inter, system-ui, sans-serif' },
          padding: 8,
          stepSize: 2,
        },
        title: {
          display: true,
          text: yAxisLabel,
          color: '#1e293b',
          font: { size: 12, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
          padding: { bottom: 8 },
        },
      },
    },
  };

  // ---------- KEY FIX: pass plugins LOCALLY (only for this Bar chart) ----------
  return (
    <div className="h-[400px] w-full">
      <Bar data={data} options={options} plugins={[valueLabelsPlugin]} />
    </div>
  );
};

export default BarChart;