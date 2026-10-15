// src/components/ChartCard.jsx
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const MINI_COLORS = ['#10B981', '#F97316', '#3B82F6', '#8B5CF6', '#FBBF24'];

function polarToCartesian(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutPath(cx, cy, innerR, outerR, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, startAngle);
  const endInner = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ');
}

const ChartCard = ({ config, pos }) => {
  const { labels, data } = useMemo(
    () => (config?.getData ? config.getData(pos) : { labels: [], data: [] }),
    [config, pos]
  );
  const total = data.reduce((a, b) => a + b, 0);

  if (config.comingSoon) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-5 h-60 flex flex-col items-center justify-center">
        <div className="text-4xl mb-3 opacity-60">{config.icon}</div>
        <h3 className="text-sm font-bold text-gray-700">{config.title}</h3>
        <p className="text-xs text-gray-400 mt-1">Coming soon</p>
      </div>
    );
  }

  let acc = 0;
  const segments = labels.map((label, i) => {
    const start = acc;
    const angle = total ? (data[i] / total) * 360 : 0;
    acc += angle;
    return {
      label,
      value: data[i],
      color: MINI_COLORS[i % MINI_COLORS.length],
      startAngle: start,
      endAngle: acc,
    };
  });

  return (
    <Link
      to={`/chart/${config.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-60 flex flex-col hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-800 truncate">{config.title}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5 truncate">{config.subtitle}</p>
        </div>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
          style={{ background: `${config.color}15`, color: config.color }}
        >
          {config.icon}
        </div>
      </div>

      {/* Mini donut + legend */}
      <div className="flex-1 flex items-center gap-3">
        <div className="relative w-[88px] h-[88px] shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f1f5f9" strokeWidth="18" />
            {segments.map((s, i) => (
              <path
                key={i}
                d={donutPath(50, 50, 26, 44, s.startAngle, s.endAngle)}
                fill={s.color}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[8px] text-gray-400 font-semibold">Total</span>
            <span className="text-base font-extrabold text-gray-800 leading-none">{total}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          {segments.slice(0, 4).map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="font-semibold text-gray-600 truncate">{s.label}</span>
              <span className="ml-auto font-bold text-gray-800 shrink-0">{s.value}</span>
            </div>
          ))}
          {segments.length > 4 && (
            <div className="text-[9px] text-gray-400 italic">+{segments.length - 4} more…</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">Click to expand</span>
        <span className="text-[10px] font-bold text-blue-600 group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default ChartCard;