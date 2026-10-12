// src/components/PieChart.jsx
import { useMemo } from 'react';

// ---------- VIBRANT MODERN PALETTE ----------
const SEGMENT_COLORS = [
  {
    // Indigo → Violet (Royal)
    base: '#6366F1',
    light: '#A5B4FC',
    dark: '#4338CA',
    edge: '#312E81',
    glow: 'rgba(99, 102, 241, 0.5)',
    gradFrom: '#818CF8',
    gradMid: '#6366F1',
    gradTo: '#4338CA',
  },
  {
    // Cyan → Teal (Fresh)
    base: '#06B6D4',
    light: '#67E8F9',
    dark: '#0891B2',
    edge: '#155E75',
    glow: 'rgba(6, 182, 212, 0.5)',
    gradFrom: '#22D3EE',
    gradMid: '#06B6D4',
    gradTo: '#0E7490',
  },
  {
    // Amber → Orange (Warm)
    base: '#F59E0B',
    light: '#FCD34D',
    dark: '#D97706',
    edge: '#92400E',
    glow: 'rgba(245, 158, 11, 0.5)',
    gradFrom: '#FBBF24',
    gradMid: '#F59E0B',
    gradTo: '#B45309',
  },
  {
    // Rose → Pink (Elegant)
    base: '#F43F5E',
    light: '#FDA4AF',
    dark: '#E11D48',
    edge: '#881337',
    glow: 'rgba(244, 63, 94, 0.5)',
    gradFrom: '#FB7185',
    gradMid: '#F43F5E',
    gradTo: '#BE123C',
  },
  {
    // Emerald → Green (Natural)
    base: '#10B981',
    light: '#6EE7B7',
    dark: '#059669',
    edge: '#064E3B',
    glow: 'rgba(16, 185, 129, 0.5)',
    gradFrom: '#34D399',
    gradMid: '#10B981',
    gradTo: '#047857',
  },
  {
    // Purple → Fuchsia (Rich)
    base: '#A855F7',
    light: '#D8B4FE',
    dark: '#9333EA',
    edge: '#581C87',
    glow: 'rgba(168, 85, 247, 0.5)',
    gradFrom: '#C084FC',
    gradMid: '#A855F7',
    gradTo: '#7E22CE',
  },
];

// Convert polar coords
function polarToCartesian(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Build a donut segment path
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

const PieChart = ({ title, labels = [], data = [], onClick }) => {
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
        percent: total > 0 ? ((Number(v) / total) * 100).toFixed(1) : 0,
      };
    });
  }, [data, labels, total]);

  const CX = 150;
  const CY = 150;
  const OUTER_R = 130;
  const INNER_R = 80;

  return (
    <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-gray-100 flex flex-col h-full">

      {/* Title */}
      {title && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
          <h3 className="text-sm font-bold text-gray-800 tracking-tight">{title}</h3>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center relative">
        {hasData ? (
          <div className="relative w-full max-w-[400px] aspect-square">

            {/* Soft ambient glow behind chart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-200/40 via-purple-200/30 to-transparent blur-3xl"></div>
            </div>

            {/* SVG 3D Donut */}
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full relative z-10"
              style={{ filter: 'drop-shadow(0 20px 35px rgba(15,23,42,0.22))' }}
            >
              <defs>
                {/* Dynamic gradients for each segment */}
                {segments.map((seg, i) => (
                  <linearGradient
                    key={`grad-${i}`}
                    id={`grad-${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={seg.color.gradFrom} />
                    <stop offset="45%" stopColor={seg.color.gradMid} />
                    <stop offset="100%" stopColor={seg.color.gradTo} />
                  </linearGradient>
                ))}

                {/* Radial highlight for glossy 3D look */}
                <radialGradient id="gloss-v2" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>

                {/* Inner shadow gradient */}
                <radialGradient id="inner-shadow" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
                </radialGradient>

                {/* Metallic pin gradient */}
                <linearGradient id="pin-grad-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F1F5F9" />
                  <stop offset="50%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                {/* Center banner gradient */}
                <linearGradient id="banner-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>

                {/* Banner border gradient */}
                <linearGradient id="banner-border" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>

              {/* Ambient shadow ring */}
              <circle cx={CX} cy={CY} r={OUTER_R + 8} fill="rgba(15,23,42,0.06)" />

              {/* Draw each segment */}
              {segments.map((seg, i) => (
                <g key={i} className="cursor-pointer">
                  {/* Outer 3D bevel — darker edge */}
                  <path
                    d={donutPath(CX, CY, INNER_R, OUTER_R + 4, seg.startAngle, seg.endAngle)}
                    fill={seg.color.edge}
                    opacity="0.85"
                  />

                  {/* Main segment with gradient */}
                  <path
                    d={donutPath(CX, CY, INNER_R, OUTER_R, seg.startAngle, seg.endAngle)}
                    fill={`url(#grad-${i})`}
                    onClick={() => onClick?.(seg.label)}
                    className="transition-all duration-300 hover:brightness-110"
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Inner highlight for depth */}
                  <path
                    d={donutPath(CX, CY, INNER_R, INNER_R + 3, seg.startAngle, seg.endAngle)}
                    fill="rgba(255,255,255,0.4)"
                  />

                  {/* Top glossy shine on segment */}
                  <path
                    d={donutPath(CX, CY, OUTER_R - 8, OUTER_R - 2, seg.startAngle, seg.endAngle)}
                    fill="rgba(255,255,255,0.25)"
                  />
                </g>
              ))}

              {/* Inner shadow ring */}
              <circle
                cx={CX}
                cy={CY}
                r={OUTER_R}
                fill="url(#inner-shadow)"
                pointerEvents="none"
              />

              {/* Gloss overlay */}
              <circle
                cx={CX}
                cy={CY}
                r={OUTER_R}
                fill="url(#gloss-v2)"
                pointerEvents="none"
              />

              {/* Metallic pins at slice boundaries */}
              {segments.length > 1 &&
                segments.map((seg, i) => {
                  const pinAngle = seg.endAngle;
                  const startP = polarToCartesian(CX, CY, INNER_R - 4, pinAngle);
                  const endP = polarToCartesian(CX, CY, OUTER_R + 22, pinAngle);

                  return (
                    <g key={`pin-${i}`}>
                      {/* Pin line */}
                      <line
                        x1={startP.x}
                        y1={startP.y}
                        x2={endP.x}
                        y2={endP.y}
                        stroke="url(#pin-grad-v2)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                      {/* Pin heads */}
                      <circle cx={startP.x} cy={startP.y} r="2.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
                      <circle cx={endP.x} cy={endP.y} r="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
                    </g>
                  );
                })}

              {/* ===================== CENTER BANNER ===================== */}
              <g pointerEvents="none">
                {/* Banner drop shadow */}
                <ellipse cx={CX} cy={CY + 44} rx="65" ry="6" fill="rgba(15,23,42,0.22)" />

                {/* Banner background — rounded rectangle */}
                <rect
                  x={CX - 72}
                  y={CY - 32}
                  width="144"
                  height="80"
                  rx="16"
                  ry="16"
                  fill="url(#banner-grad)"
                  stroke="url(#banner-border)"
                  strokeWidth="1.5"
                />

                {/* Inner highlight border */}
                <rect
                  x={CX - 69}
                  y={CY - 29}
                  width="138"
                  height="74"
                  rx="13"
                  ry="13"
                  fill="none"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1"
                />

                {/* Small badge icon top-left of banner */}
                <circle cx={CX - 55} cy={CY - 18} r="4" fill="#6366F1" opacity="0.15" />
                <circle cx={CX - 55} cy={CY - 18} r="2" fill="#6366F1" />

                {/* Label — top */}
                <text
                  x={CX}
                  y={CY - 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#64748B"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="1.5"
                >
                  TOTAL
                </text>

                {/* Total value — big */}
                <text
                  x={CX}
                  y={CY + 24}
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="900"
                  fill="#0F172A"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="-0.5"
                >
                  {total.toLocaleString()}
                </text>

                {/* Sub-label */}
                <text
                  x={CX}
                  y={CY + 42}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#94A3B8"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="2"
                >
                  {labels.length === 2 ? 'CBCMP · KDCMP' : 'PURCHASE ORDERS'}
                </text>
              </g>
            </svg>

            {/* ===================== LEGEND ===================== */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-[0_8px_25px_rgba(15,23,42,0.15)] border border-gray-100">
              {segments.map((seg, i) => (
                <button
                  key={i}
                  onClick={() => onClick?.(seg.label)}
                  className="group flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{
                      backgroundColor: seg.color.base,
                      boxShadow: `0 0 8px ${seg.color.glow}`,
                    }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-tight">
                      {seg.label}
                    </span>
                    <span className="text-[12px] font-extrabold text-gray-900 leading-tight">
                      {seg.value}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ===================== EMPTY STATE ===================== */
          <div className="flex flex-col items-center justify-center text-indigo-400 py-12">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-40"></div>
              <svg
                className="w-20 h-20 relative opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <p className="text-sm font-bold text-gray-600">No data available</p>
            <p className="text-xs mt-1 text-gray-400">Try a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;