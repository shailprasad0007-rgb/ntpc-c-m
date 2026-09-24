import { useMemo } from 'react';

// Original full colors
const COLORS = ['#0b4bff', '#1fb5c0', '#0b3d91', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutPath(cx, cy, innerR, outerR, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, startAngle);
  const endInner = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle > 180? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
    `Z`
  ].join(' ');
}

const DonutChart = ({ title="Order Plant Group Overview", subtitle, labels=[], data=[], onClick }) => {
  const total = data.reduce((a,b)=>a+b,0);

  const segments = useMemo(()=>{
    let acc = 0;
    return data.map((v,i)=>{
      const start = acc;
      const angle = total? (v/total)*360 : 0;
      acc += angle;
      return {
        value: v,
        label: labels[i],
        color: COLORS[i % COLORS.length],
        startAngle: start,
        endAngle: acc,
      };
    });
  },[data, labels, total]);

  if(!labels.length) return <div className="p-6 text-center text-gray-400 text-sm">No data</div>;

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-gray-800">{title}</h3>
        <p className="text-[11px] text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-4">

        {/* Clickable Donut - SVG */}
        <div className="relative w-[240px] h-[240px] shrink-0">
          <svg width="240" height="240" viewBox="0 0 240 240" className="w-full h-full">
            {segments.map((seg, i) => (
              <path
                key={i}
                d={donutPath(120, 120, 75, 110, seg.startAngle, seg.endAngle)}
                fill={seg.color}
                className="cursor-pointer hover:opacity-80 transition-all duration-200 hover:brightness-110"
                onClick={() => onClick?.(seg.label)}
                style={{ cursor: 'pointer' }}
              >
                <title>{seg.label}: {seg.value}</title>
              </path>
            ))}
          </svg>

          {/* Center - Total POs - Non clickable */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white rounded-full flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[14px] font-semibold text-[#4a6fa5]">Total POs</span>
            <span className="text-[48px] font-extrabold text-[#0f1e3d] leading-none mt-1">{total}</span>
          </div>
        </div>

        {/* Legend bhi clickable */}
        <div className="flex flex-col gap-2.5">
          {segments.map((seg,i)=>(
            <div
              key={i}
              onClick={()=>onClick?.(seg.label)}
              className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-md rounded-xl cursor-pointer transition-all"
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{background: seg.color}}></span>
              <span className="text-[13px] font-bold text-gray-700">{seg.label}</span>
              <span className="text-[13px] font-bold ml-auto">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;