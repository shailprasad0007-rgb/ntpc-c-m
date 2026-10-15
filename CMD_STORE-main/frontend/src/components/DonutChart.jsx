import { useMemo } from 'react';

// ---------- SPECIAL HIGHLIGHT COLORS (by label name) ----------
const LABEL_COLORS = {
  CASH: '#FBBF24',   // Vivid Gold/Amber — highlighted
  MOU:  '#8B5CF6',   // Purple (optional special)
};

// ---------- DEFAULT GREEN & ORANGE PALETTE ----------
const DEFAULT_COLORS = [
  '#10B981', // Emerald Green
  '#F97316', // Orange
  '#065F46', // Deep Forest Green
  '#7C2D12', // Deep Burnt Orange
  '#6EE7B7', // Light Mint
  '#FED7AA', // Light Peach
  '#22C55E', // Pure Green
  '#FB923C', // Light Orange
];

// Assign colors — CASH gets highlighted, others follow the green/orange palette
function getColorForLabel(label, index) {
  const key = String(label || '').trim().toUpperCase();
  if (LABEL_COLORS[key]) return LABEL_COLORS[key];
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

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

const DonutChart = ({ labels = [], data = [], onClick }) => {
  const total = data.reduce((a, b) => a + b, 0);

  const segments = useMemo(() => {
    let acc = 0;
    return data.map((v, i) => {
      const start = acc;
      const angle = total ? (v / total) * 360 : 0;
      acc += angle;
      const isCash = String(labels[i] || '').trim().toUpperCase() === 'CASH';
      return {
        value: v,
        label: labels[i],
        color: getColorForLabel(labels[i], i),
        isCash,
        startAngle: start,
        endAngle: acc,
      };
    });
  }, [data, labels, total]);

  if (!labels.length) {
    return <div className="p-6 text-center text-gray-400 text-sm">No data</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-4">
        <div className="relative w-[240px] h-[240px] shrink-0">
          <svg width="240" height="240" viewBox="0 0 240 240" className="w-full h-full">
            <circle cx="120" cy="120" r="113" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="4" />

            {segments.map((seg, i) => (
              <g key={i}>
                {/* Extra glow for CASH */}
                {seg.isCash && (
                  <path
                    d={donutPath(120, 120, 73, 112, seg.startAngle, seg.endAngle)}
                    fill={seg.color}
                    opacity="0.35"
                    style={{ filter: 'blur(6px)' }}
                  />
                )}

                <path
                  d={donutPath(120, 120, 75, 110, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  stroke="#ffffff"
                  strokeWidth={seg.isCash ? 4 : 3}
                  strokeLinejoin="round"
                  className="cursor-pointer hover:opacity-90 transition-all duration-200"
                  onClick={() => onClick?.(seg.label)}
                  style={{
                    cursor: 'pointer',
                    filter: seg.isCash
                      ? 'drop-shadow(0 0 6px rgba(251,191,36,0.8)) drop-shadow(0 2px 3px rgba(15,23,42,0.2))'
                      : 'drop-shadow(0 2px 3px rgba(15,23,42,0.12))',
                  }}
                >
                  <title>{seg.label}: {seg.value}</title>
                </path>
              </g>
            ))}

            <circle cx="120" cy="120" r="110" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
            <circle cx="120" cy="120" r="75" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white rounded-full flex flex-col items-center justify-center pointer-events-none shadow-inner border border-gray-100">
            <span className="text-[14px] font-semibold text-[#4a6fa5]">Total POs</span>
            <span className="text-[48px] font-extrabold text-[#0f1e3d] leading-none mt-1">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {segments.map((seg, i) => (
            <div
              key={i}
              onClick={() => onClick?.(seg.label)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all min-w-[200px] border ${
                seg.isCash
                  ? 'bg-amber-50 border-amber-200 hover:bg-amber-100 shadow-sm hover:shadow-md'
                  : 'bg-gray-50 hover:bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-sm shrink-0 ${
                  seg.isCash ? 'ring-amber-100' : ''
                }`}
                style={{
                  background: seg.color,
                  boxShadow: seg.isCash ? '0 0 6px rgba(251,191,36,0.7)' : undefined,
                }}
              />
              <span
                className={`text-[13px] font-bold ${
                  seg.isCash ? 'text-amber-800' : 'text-gray-700'
                }`}
              >
                {seg.label}
              </span>
              <span
                className={`text-[13px] font-bold ml-auto ${
                  seg.isCash ? 'text-amber-900' : ''
                }`}
              >
                {seg.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;