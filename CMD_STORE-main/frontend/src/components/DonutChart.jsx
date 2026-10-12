// src/components/DonutChart.jsx
import { useMemo } from 'react';

// ---------- INFOGRAPHIC PALETTE ----------
const SEGMENT_COLORS = [
  { base: '#29ABE2', light: '#5BC0EB', dark: '#1A82B8' },
  { base: '#FF8A00', light: '#FFA733', dark: '#D96E00' },
  { base: '#FFC107', light: '#FFD54F', dark: '#D9A000' },
  { base: '#8BC34A', light: '#AED581', dark: '#689F38' },
  { base: '#EC407A', light: '#F06292', dark: '#C2185B' },
];

function polarToCartesian(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function wedgePath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

const DonutChart = ({ title, labels = [], data = [], onClick }) => {
  const total = data.reduce((a, b) => a + (Number(b) || 0), 0);
  const hasData = labels.length > 0 && data.length > 0 && total > 0;

  const segments = useMemo(() => {
    let acc = 0;
    return data.map((v, i) => {
      const start = acc;
      const angle = total ? (Number(v) / total) * 360 : 0;
      acc += angle;
      return {
        value: Number(v),
        label: labels[i],
        color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
        startAngle: start,
        endAngle: acc,
        midAngle: start + angle / 2,
        percent: total > 0 ? Math.round((Number(v) / total) * 100) : 0,
      };
    });
  }, [data, labels, total]);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400 py-10">
        <svg className="w-12 h-12 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        </svg>
        <p className="text-xs font-semibold text-gray-500">No data available</p>
      </div>
    );
  }

  const CX = 250;
  const CY = 250;
  const OUTER_R = 130;
  const INNER_GAP = 68;
  const EXPLODE = 9;

  return (
    <div className="w-full flex flex-col">

      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full"></span>
          <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        </div>
      )}

      {/* ===================== PIE + LEGEND SIDE BY SIDE ===================== */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">

        {/* ===================== PIE CHART ===================== */}
        <div className="relative w-[300px] h-[300px] shrink-0">

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100/50 via-pink-100/40 to-yellow-100/50 blur-2xl"></div>
          </div>

          <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
            <defs>
              {segments.map((seg, i) => (
                <radialGradient key={`grad-${i}`} id={`wedge-grad-${i}`} cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor={seg.color.light} />
                  <stop offset="60%" stopColor={seg.color.base} />
                  <stop offset="100%" stopColor={seg.color.dark} />
                </radialGradient>
              ))}

              <filter id="wedge-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
              </filter>

              <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Exploded wedges */}
            {segments.map((seg, i) => {
              const offsetAngle = ((seg.midAngle - 90) * Math.PI) / 180;
              const offsetX = Math.cos(offsetAngle) * EXPLODE;
              const offsetY = Math.sin(offsetAngle) * EXPLODE;

              return (
                <g
                  key={`wedge-${i}`}
                  transform={`translate(${offsetX}, ${offsetY})`}
                  filter="url(#wedge-shadow)"
                  className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                  onClick={() => onClick?.(seg.label)}
                >
                  <path
                    d={wedgePath(CX, CY, OUTER_R, seg.startAngle, seg.endAngle)}
                    fill={`url(#wedge-grad-${i})`}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                </g>
              );
            })}

            {/* Center white hub */}
            <g filter="url(#hub-shadow)">
              <circle cx={CX} cy={CY} r={INNER_GAP + 6} fill="#FFFFFF" />
              <circle cx={CX} cy={CY} r={INNER_GAP + 6} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            </g>

            {/* Inner colored ring */}
            <g>
              {segments.map((seg, i) => {
                const r1 = 38;
                const r2 = 58;
                const startOuter = polarToCartesian(CX, CY, r2, seg.endAngle);
                const endOuter = polarToCartesian(CX, CY, r2, seg.startAngle);
                const startInner = polarToCartesian(CX, CY, r1, seg.startAngle);
                const endInner = polarToCartesian(CX, CY, r1, seg.endAngle);
                const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;

                const path = [
                  `M ${startOuter.x} ${startOuter.y}`,
                  `A ${r2} ${r2} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
                  `L ${startInner.x} ${startInner.y}`,
                  `A ${r1} ${r1} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
                  'Z',
                ].join(' ');

                return (
                  <path
                    key={`inner-${i}`}
                    d={path}
                    fill={seg.color.base}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* Center mini pie */}
            <g>
              <circle cx={CX} cy={CY} r="36" fill="#FFFFFF" />
              {segments.map((seg, i) => {
                const r = 28;
                const start = polarToCartesian(CX, CY, r, seg.endAngle);
                const end = polarToCartesian(CX, CY, r, seg.startAngle);
                const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;

                const path = [
                  `M ${CX} ${CY}`,
                  `L ${start.x} ${start.y}`,
                  `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
                  'Z',
                ].join(' ');

                return (
                  <path
                    key={`mini-${i}`}
                    d={path}
                    fill={seg.color.base}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* % labels on slices */}
            {segments.map((seg, i) => {
              const offsetAngle = ((seg.midAngle - 90) * Math.PI) / 180;
              const offsetX = Math.cos(offsetAngle) * EXPLODE;
              const offsetY = Math.sin(offsetAngle) * EXPLODE;

              const labelPos = polarToCartesian(CX, CY, OUTER_R * 0.72, seg.midAngle);

              return (
                <text
                  key={`pct-${i}`}
                  x={labelPos.x + offsetX}
                  y={labelPos.y + offsetY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="16"
                  fontWeight="800"
                  fill="#FFFFFF"
                  fontFamily="Inter, system-ui, sans-serif"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
                  pointerEvents="none"
                >
                  {seg.percent}%
                </text>
              );
            })}

            {/* Icon badges */}
            {segments.map((seg, i) => {
              const offsetAngle = ((seg.midAngle - 90) * Math.PI) / 180;
              const offsetX = Math.cos(offsetAngle) * EXPLODE;
              const offsetY = Math.sin(offsetAngle) * EXPLODE;

              const badgePos = polarToCartesian(CX, CY, OUTER_R + 22, seg.midAngle);

              return (
                <g key={`badge-${i}`} transform={`translate(${badgePos.x + offsetX}, ${badgePos.y + offsetY})`}>
                  <circle r="14" fill="#FFFFFF" filter="url(#wedge-shadow)" />
                  <circle r="12" fill={seg.color.base} />
                  <circle r="3" fill="#FFFFFF" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* ===================== LEGEND (RIGHT SIDE) ===================== */}
        <div className="flex flex-col gap-2.5 min-w-[180px]">
          {segments.map((seg, i) => (
            <button
              key={i}
              onClick={() => onClick?.(seg.label)}
              className="group flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              {/* Colored dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: seg.color.base,
                  boxShadow: `0 0 8px ${seg.color.base}66`,
                }}
              />

              {/* Label */}
              <span className="text-[12px] font-bold text-gray-700 flex-1 text-left truncate">
                {seg.label}
              </span>

              {/* Value + % */}
              <div className="flex flex-col items-end leading-tight">
                <span className="text-[13px] font-extrabold text-gray-900">
                  {seg.value}
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  {seg.percent}%
                </span>
              </div>

              {/* Arrow on hover */}
              <svg
                className="w-3 h-3 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;