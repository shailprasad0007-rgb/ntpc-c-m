// src/components/Events.jsx
import React from 'react';

const EVENT_ITEMS = [
  { label: 'Highlights', href: '/about-us', color: 'from-amber-500 to-orange-500' },
  { label: 'Events', href: '/cmdepartment', color: 'from-emerald-500 to-teal-500' },
  { label: "Today completed po", href: '/manuals', color: 'from-pink-500 to-rose-500' },
];

function Events() {
  return (
    <div className="w-full  bg-gradient-to-r from-[#0b3d91] via-[#1e5fd0] to-[#0b3d91] py-2.5 overflow-hidden shadow-sm border-y border-blue-800">
      <div className="flex items-center gap-4">
        {/* Static "Latest" label */}
        <div className="shrink-0 flex items-center gap-2 pl-4 pr-3 border-r border-white/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-[11px] font-extrabold text-white uppercase tracking-widest">
            Latest
          </span>
        </div>

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden relative">
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              gap: 1.5rem;
              width: max-content;
              animation: marqueeScroll 25s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-track">
            {/* Duplicated array = seamless loop */}
            {[...EVENT_ITEMS, ...EVENT_ITEMS, ...EVENT_ITEMS, ...EVENT_ITEMS].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group flex items-center gap-2 shrink-0"
              >
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${item.color} shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90"></span>
                  {item.label}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Right fade for clean edge */}
        {/* <div className="shrink-0 w-16 h-full bg-gradient-to-l from-[#0b3d91] to-transparent pointer-events-none absolute right-0 top-0 bottom-0 hidden md:block"></div> */}
      </div>
    </div>
  );
}

export default Events;