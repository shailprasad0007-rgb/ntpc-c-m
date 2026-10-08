// src/components/Topbar.jsx
import { Bell, Grid, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import topbar from '../../public/topbar.jpg';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="relative w-full overflow-hidden rounded-2xl shadow-lg">

      {/* Background Banner Image */}
      <img
  src={topbar}
  alt="Shared Service Site C&M"
  className="w-full h-auto block"
/>

      {/* Dark gradient overlay — text readable */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e3a]/85 via-[#0b1e3a]/40 to-transparent pointer-events-none"></div> */}

      {/* ===================== NTPC LOGO (TOP-LEFT) ===================== */}
      <div className="absolute top-3 right-4 md:right-6 z-20 flex items-center gap-3">
        <div className="rounded-lg px-4 py-2 flex items-center justify-center">
          <img
            src="/ntpc-logo.png"
            alt="NTPC Logo"
            className="h-24 md:h-24 w-auto object-contain"
          />
        </div>
      </div>

      {/* ===================== CONTENT — image ke upar overlay ===================== */}
      <div className="absolute inset-0 flex items-center gap-4 px-4 md:px-6 z-10 pt-14 md:pt-16">

        {/* Grid icon */}
        {/* <button className="text-white/80 hover:text-white transition shrink-0">
          <Grid size={20} />
        </button> */}

        {/* Search bar */}
        {/* <div className="flex-1 max-w-xl relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            type="text"
            placeholder="Search PO, Agency, Work..."
            className="w-full pl-10 pr-4 py-2 bg-white/15 backdrop-blur-sm text-white placeholder-white/70 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
          />
        </div> */}

        {/* Spacer */}
        {/* <div className="flex-1"></div> */}

        {/* Bell */}
        {/* <button className="relative shrink-0">
          <Bell size={20} className="text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            1
          </span>
        </button> */}

        {/* User info */}
        {/* <div className="flex items-center gap-3 pl-4 border-l border-white/30 shrink-0">
          <div className="w-9 h-9 bg-white text-[#0b1e3a] rounded-full flex items-center justify-center text-sm font-bold shadow-md">
            AK
          </div>
          <div className="text-xs leading-tight hidden md:block text-white">
            <div className="font-semibold">
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </div>
            <div className="text-blue-100 text-[10px]">Site Administrator</div>
          </div>
          <ChevronDown size={16} className="text-white/80" />
        </div> */}
      </div>
    </header>
  );
};

export default Topbar;