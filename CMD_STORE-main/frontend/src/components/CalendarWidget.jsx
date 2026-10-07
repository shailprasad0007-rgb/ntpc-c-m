// src/components/CalendarWidget.jsx
import { Calendar as CalIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarWidget = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (grid.length % 7 !== 0) grid.push(null);

  const monthName = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <CalIcon size={16} />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Calendar & Deadlines</h3>
        </div>
        <button className="text-[11px] text-blue-600 font-semibold hover:underline">View All</button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={14} /></button>
        <span className="text-sm font-semibold text-gray-800">{monthName}</span>
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={14} /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-500 mb-1">
        {DAYS.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {grid.map((d, i) => (
          <div
            key={i}
            className={`h-8 flex items-center justify-center rounded-md transition ${
              d === today
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : d ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : ''
            }`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;