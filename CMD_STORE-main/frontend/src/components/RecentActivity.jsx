// src/components/RecentActivity.jsx
import { CheckCircle, FilePlus, RefreshCw, Sparkles } from 'lucide-react';

const items = [
  { icon: CheckCircle, tone: 'text-emerald-600 bg-emerald-50', title: 'PO 4000396069 Approved', sub: 'By HOD • 12 Sep 2026 10:45 AM' },
  { icon: FilePlus,    tone: 'text-blue-600 bg-blue-50',       title: 'New PO Created',           sub: 'PO 5500049310 • 11 Sep 2026 02:30 PM' },
  { icon: RefreshCw,   tone: 'text-purple-600 bg-purple-50',   title: 'Status Updated',           sub: 'PO 4600089381 • 10 Sep 2026 04:20 PM' },
  { icon: Sparkles,    tone: 'text-amber-600 bg-amber-50',     title: 'New Enquiry Assigned',     sub: 'MOU Type • 09 Sep 2026 11:15 AM' },
];

const RecentActivity = () => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
          <RefreshCw size={16} />
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">Recent Activity</h3>
      </div>
      <button className="text-[11px] text-blue-600 font-semibold hover:underline">View All</button>
    </div>

    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${it.tone}`}>
            <it.icon size={14} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-800 truncate">{it.title}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;