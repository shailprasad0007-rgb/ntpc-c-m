// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Info, Folder, Link as LinkIcon,
  FileText, TrendingUp, Database, BookOpen, ChevronRight,
  Upload,
} from 'lucide-react';

const MENU = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, iconBg: 'bg-blue-500', iconColor: 'text-white' },
  { name: 'About Us', path: '/about-us', icon: Info, iconBg: 'bg-cyan-500/90', iconColor: 'text-white' },
  { name: 'CmDepartment', path: '/cmdepartment', icon: Folder, iconBg: 'bg-sky-500/90', iconColor: 'text-white' },
  { name: 'Important Links', path: '/important-links', icon: LinkIcon, iconBg: 'bg-purple-500/90', iconColor: 'text-white' },
  { name: 'Circulars & Guidelines', path: '/circulars', icon: FileText, iconBg: 'bg-emerald-500/90', iconColor: 'text-white' },
  { name: 'Dop', path: '/doppage', icon: TrendingUp, iconBg: 'bg-orange-500/90', iconColor: 'text-white' },
  { name: 'External Links', path: '/external-links', icon: LinkIcon, iconBg: 'bg-pink-500/90', iconColor: 'text-white' },
  { name: 'Coal Mining Links', path: '/coal-mining-links', icon: LinkIcon, iconBg: 'bg-teal-500/90', iconColor: 'text-white' },
  { name: 'Manuals & Standards', path: '/manuals', icon: BookOpen, iconBg: 'bg-indigo-500/90', iconColor: 'text-white' },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-60 shrink-0 flex flex-col text-white relative overflow-hidden bg-[#0a1a3a]">

      {/* ===================== BACKGROUND ===================== */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a3a] via-[#0d2352] to-[#0a1a3a]"></div>

      {/* Blue radial glow at top-right */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      ></div>

      {/* Blue curve light streak (bottom) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(56,189,248,0.3) 0%, transparent 60%)',
        }}
      ></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full w-full">

        {/* ===================== DOTTED GRID DECORATION ===================== */}
        <div className="absolute top-5 left-4 grid grid-cols-3 gap-2.5 pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-blue-400/60"></span>
          ))}
        </div>

        {/* ===================== LOGO ===================== */}
        <div className="flex items-center justify-center pt-6 pb-4 shrink-0">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(59,130,246,0.4)] border-2 border-white/30">
            <img
              src="/ntpc_logo.jpg"
              alt="NTPC Logo"
              className="w-20 h-auto object-contain"
            />
          </div>
        </div>

        {/* ===================== MENU — ONE BIG BOX ===================== */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto sidebar-scroll">
          <div
            className="rounded-[22px] p-2.5 space-y-1.5 border border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)]"
            style={{
              background: 'linear-gradient(180deg, rgba(15,32,71,0.9) 0%, rgba(10,26,58,0.95) 100%)',
            }}
          >

            {MENU.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 text-sm rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400/60'
                      : 'text-gray-100 hover:bg-white/5'
                  }`
                }
              >
                {/* Left accent bar on active */}
                {({ isActive }) => null}

                {/* Icon box */}
                <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-lg border border-white/20`}>
                  <item.icon size={16} className={item.iconColor} />
                </div>

                {/* Text */}
                <span className="truncate flex-1 text-left text-[13px] font-semibold">
                  {item.name}
                </span>

                {/* Chevron */}
                <ChevronRight
                  size={16}
                  className="ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0"
                />
              </NavLink>
            ))}

            {/* ===================== DIVIDER ===================== */}
            <div className="my-2 mx-2 border-t border-blue-400/30"></div>

            {/* ===================== ADMIN UPLOAD ===================== */}
            {(user?.role === 'admin' || true) && (
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 text-sm rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400/60'
                      : 'text-gray-100 hover:bg-white/5'
                  }`
                }
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/90 flex items-center justify-center shrink-0 shadow-lg border border-white/20">
                  <Upload size={16} className="text-white" />
                </div>
                <span className="truncate flex-1 text-left text-[13px] font-semibold">
                  Admin Upload
                </span>
                <ChevronRight size={16} className="ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </NavLink>
            )}

          </div>
        </nav>

        {/* ===================== BOTTOM POWER PLANT IMAGE ===================== */}
        <div className="relative h-32 shrink-0 pointer-events-none">
          <img
            src="/sidebar.jpg"
            alt=""
            className="absolute bottom-0 left-0 w-full h-full object-cover opacity-70"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
            }}
          />
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;