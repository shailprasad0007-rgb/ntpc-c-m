import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom Plugin to display percentages inside the slices
const displayPercentages = {
  id: 'displayPercentages',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
    
    chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
      const value = data.datasets[0].data[index];
      const percentage = ((value / total) * 100).toFixed(1) + '%';
      
      // Only show if the slice is big enough to fit text
      if (parseFloat(percentage) > 3) {
        const { x, y } = datapoint.tooltipPosition();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percentage, x, y);
      }
    });
  }
};

ChartJS.register(displayPercentages);

const PieChart = ({ title, labels, data, colors, onClick }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors || [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1', 
          '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#06B6D4'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }, // Right side to give more space
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onClick) {
        const index = elements[0].index;
        onClick(labels[index]);
      }
    },
  };

  return (
    <div className="bg-purple-100 p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col cursor-pointer">
      <h3 className="w-full bg-gradient-to-r from-[#0f2e9e] to-[#1e90ff] text-white text-center py-3 px-4 rounded-t-xl font-bold text-[14px] tracking-wider uppercase">{title}</h3>
      <div className="flex-1 relative">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;