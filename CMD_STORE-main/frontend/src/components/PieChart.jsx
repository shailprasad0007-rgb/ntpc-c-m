import { useMemo } from 'react';

// ---------- SPECIAL HIGHLIGHT COLORS (by label name) ----------
const LABEL_COLORS = {
  CASH: { base: '#FBBF24', light: '#FDE68A', dark: '#F59E0B', edge: '#B45309' }, // Vivid Gold
  MOU:  { base: '#8B5CF6', light: '#A78BFA', dark: '#7C3AED', edge: '#5B21B6' }, // Purple
};

// ---------- DEFAULT GREEN & ORANGE PALETTE ----------
const DEFAULT_COLORS = [
  { base: '#10B981', light: '#34D399', dark: '#047857', edge: '#065F46' }, // Emerald
  { base: '#F97316', light: '#FB923C', dark: '#EA580C', edge: '#C2410C' }, // Orange
  { base: '#065F46', light: '#047857', dark: '#064E3B', edge: '#022C22' }, // Deep Forest
  { base: '#7C2D12', light: '#9A3412', dark: '#5C1F0A', edge: '#431407' }, // Deep Burnt
  { base: '#6EE7B7', light: '#A7F3D0', dark: '#34D399', edge: '#10B981' }, // Light Mint
  { base: '#FED7AA', light: '#FFEDD5', dark: '#FDBA74', edge: '#FB923C' }, // Light Peach
  { base: '#22C55E', light: '#4ADE80', dark: '#16A34A', edge: '#15803D' }, // Pure Green
  { base: '#FB923C', light: '#FDBA74', dark: '#F97316', edge: '#EA580C' }, // Light Orange
];

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

const PieChart = ({ title, labels = [], data = [], onClick }) => {
  const total = data.reduce((a, b) => a + (Number(b) || 0), 0);
  const hasData = labels.length > 0 && data.length > 0 && total > 0;

  const segments = useMemo(() => {
    let acc = 0;
    return data.map((v, i) => {
      const start = acc;
      const angle = total ? (Number(v) / total) * 360 : 0;
      acc += angle;
      const isCash = String(labels[i] || '').trim().toUpperCase() === 'CASH';
      return {
        value: Number(v),
        label: labels[i],
        color: getColorForLabel(labels[i], i),
        isCash,
        startAngle: start,
        endAngle: acc,
        midAngle: start + angle / 2,
      };
    });
  }, [data, labels, total]);

  const CX = 150;
  const CY = 150;
  const OUTER_R = 130;
  const INNER_R = 82;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      {title && <h3 className="text-sm font-bold text-gray-700 mb-2 px-1">{title}</h3>}

      <div className="flex-1 flex items-center justify-center relative">
        {hasData ? (
          <div className="relative w-full max-w-[380px] aspect-square">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 12px 24px rgba(15,23,42,0.18))' }}
            >
              <defs>
                {segments.map((seg, i) => (
                  <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={seg.color.light} />
                    <stop offset="45%" stopColor={seg.color.base} />
                    <stop offset="100%" stopColor={seg.color.dark} />
                  </linearGradient>
                ))}

                {/* Glow for CASH */}
                <filter id="cash-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <radialGradient id="gloss" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>

                <linearGradient id="pin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="50%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>

              <circle cx={CX} cy={CY} r={OUTER_R + 6} fill="rgba(15,23,42,0.05)" />

              {segments.map((seg, i) => (
                <g key={i} className="cursor-pointer">
                  {/* Outer 3D bevel */}
                  <path
                    d={donutPath(CX, CY, INNER_R, OUTER_R + 3, seg.startAngle, seg.endAngle)}
                    fill={seg.color.edge}
                    opacity="0.7"
                  />
                  {/* Main segment */}
                  <path
                    d={donutPath(CX, CY, INNER_R, OUTER_R, seg.startAngle, seg.endAngle)}
                    fill={`url(#grad-${i})`}
                    stroke="#ffffff"
                    strokeWidth={seg.isCash ? 4 : 3}
                    strokeLinejoin="round"
                    filter={seg.isCash ? 'url(#cash-glow)' : undefined}
                    onClick={() => onClick?.(seg.label)}
                    className="transition-all duration-200 hover:brightness-110"
                    style={{
                      filter: seg.isCash
                        ? 'drop-shadow(0 0 6px rgba(251,191,36,0.7)) drop-shadow(0 2px 4px rgba(15,23,42,0.15))'
                        : 'drop-shadow(0 2px 4px rgba(15,23,42,0.15))',
                    }}
                  />
                  {/* Inner edge highlight */}
                  <path
                    d={donutPath(CX, CY, INNER_R, INNER_R + 2, seg.startAngle, seg.endAngle)}
                    fill="rgba(255,255,255,0.35)"
                  />
                </g>
              ))}

              <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#gloss)" pointerEvents="none" />

              <circle cx={CX} cy={CY} r={OUTER_R + 1.5} fill="none" stroke="#ffffff" strokeWidth="3" />
              <circle cx={CX} cy={CY} r={OUTER_R + 3} fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
              <circle cx={CX} cy={CY} r={INNER_R - 1.5} fill="none" stroke="#ffffff" strokeWidth="3" />

              {/* Metallic pins */}
              {segments.length > 1 &&
                segments.map((seg, i) => {
                  const pinAngle = seg.endAngle;
                  const startP = polarToCartesian(CX, CY, INNER_R - 4, pinAngle);
                  const endP = polarToCartesian(CX, CY, OUTER_R + 25, pinAngle);
                  return (
                    <g key={`pin-${i}`}>
                      <line
                        x1={startP.x} y1={startP.y}
                        x2={endP.x} y2={endP.y}
                        stroke="url(#pin-grad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx={startP.x} cy={startP.y} r="2.5" fill="#E2E8F0" />
                      <circle cx={endP.x} cy={endP.y} r="2.5" fill="#E2E8F0" />
                    </g>
                  );
                })}

              {/* Center Banner */}
              <g pointerEvents="none">
                <ellipse cx={CX} cy={CY + 42} rx="60" ry="6" fill="rgba(15,23,42,0.18)" />
                <path
                  d={`M ${CX - 68} ${CY - 22}
                      Q ${CX - 70} ${CY - 30} ${CX - 60} ${CY - 30}
                      L ${CX + 60} ${CY - 30}
                      Q ${CX + 70} ${CY - 30} ${CX + 68} ${CY - 22}
                      L ${CX + 62} ${CY + 34}
                      Q ${CX + 58} ${CY + 42} ${CX + 48} ${CY + 42}
                      L ${CX - 48} ${CY + 42}
                      Q ${CX - 58} ${CY + 42} ${CX - 62} ${CY + 34}
                      Z`}
                  fill="#F1F5F9"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                <text
                  x={CX} y={CY - 4}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill="#1E293B"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="0.5"
                >
                  {labels.length === 2 ? 'CBCMP / KDCMP' : 'TOTAL'}
                </text>
                <text
                  x={CX} y={CY + 20}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="900"
                  fill="#0F172A"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {total.toLocaleString()} POs
                </text>
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 max-w-[90%]">
              {segments.map((seg, i) => (
                <button
                  key={i}
                  onClick={() => onClick?.(seg.label)}
                  className={`flex items-center gap-1.5 transition-opacity ${
                    seg.isCash ? 'opacity-100' : 'hover:opacity-80'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full ring-2 ring-white"
                    style={{
                      backgroundColor: seg.color.base,
                      boxShadow: seg.isCash ? '0 0 6px rgba(251,191,36,0.8)' : '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  />
                  <span
                    className={`text-[10px] font-bold ${
                      seg.isCash ? 'text-amber-800' : 'text-gray-700'
                    }`}
                  >
                    {seg.label}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold ${
                      seg.isCash ? 'text-amber-900' : 'text-gray-900'
                    }`}
                  >
                    {seg.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-green-700 py-12">
            <svg className="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-sm font-medium">No data available</p>
            <p className="text-xs mt-1">Try a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;