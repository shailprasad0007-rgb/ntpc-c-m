
 // src/components/KpiCard.jsx
import { TrendingUp } from 'lucide-react';

const TONES = {
  blue: {
    grad: 'from-blue-400 to-white',
    iconBg: 'bg-blue-100',
    iconTx: 'text-blue-900',
    stroke: '#173461',
  },
  purple: {
    grad: 'from-purple-400 to-white',
    iconBg: 'bg-purple-100',
    iconTx: 'text-purple-900',
    stroke: '#371358',
  },
  green: {
    grad: 'from-emerald-400 to-white',
    iconBg: 'bg-emerald-100',
    iconTx: 'text-emerald-900',
    stroke: '#0e4623',
  },
  orange: {
    grad: 'from-orange-400 to-white',
    iconBg: 'bg-orange-100',
    iconTx: 'text-orange-900',
    stroke: '#9e4303',
  },
};

const KpiCard = ({
  title,
  value,
  icon,
  change,
  subtitle = 'vs. last month',
  tone = 'blue',
}) => {
  const t = TONES[tone] || TONES.blue;

  return (
    <div
      className={`relative bg-gradient-to-br ${t.grad} rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Icon and title */}
          <div className="flex items-center gap-2">
            <div
              className={`w-11 h-11 ${t.iconBg} ${t.iconTx} rounded-lg flex items-center justify-center shrink-0 text-base`}
            >
              {icon}
            </div>

            <span className="text-xs text-gray-600 font-medium truncate">
              {title}
            </span>
          </div>

          {/* Main value */}
          <div className="mt-3 text-2xl font-bold text-gray-900 truncate">
            {value}
          </div>

          {/* Green trending arrow and subtitle */}
          <div className="mt-2 flex items-center gap-1 text-xs">
            <TrendingUp
              size={12}
              className="text-emerald-600 shrink-0"
            />

            <span className="text-emerald-600 font-semibold">
              {change}
            </span>

            <span className="text-gray-500 truncate">
              {subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
