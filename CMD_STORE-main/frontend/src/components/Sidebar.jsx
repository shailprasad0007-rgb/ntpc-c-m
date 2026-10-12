// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Info, Folder, Link as LinkIcon,
  FileText, TrendingUp, Database, BookOpen, ChevronRight,
  Upload,
} from 'lucide-react';

const MENU = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'About Us', path: '/about-us', icon: Info },
  { name: 'CmDepartment', path: '/cmdepartment', icon: Folder },
  { name: 'Important Links', path: '/important-links', icon: LinkIcon },
  { name: 'Circulars & Guidelines', path: '/circulars', icon: FileText },
  { name: 'Dop', path: '/doppage', icon: TrendingUp },
  { name: 'External Links', path: '/external-links', icon: LinkIcon },
  { name: 'Coal Mining Links', path: '/coal-mining-links', icon: LinkIcon },
  { name: 'Manuals & Standards', path: '/manuals', icon: BookOpen },
];

const Sidebar = () => {
  const { user } = useAuth();

  // 👇 Debug — browser console me dikhega
  console.log('Sidebar user:', user);
  console.log('User role:', user?.role);

  return (
    <aside
      className="w-60 shrink-0 flex flex-col text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/sidebar.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1e3a]/40 via-transparent to-[#0b1e3a]/60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">

        {/* ===================== NML LOGO ===================== */}
        <div className="flex items-center justify-center pt-5 pb-3 shrink-0">
          <img
            src="/ntpc_logo.jpg"
            alt="NML Logo"
            className="w-24 h-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* ===================== MENU — ONE BOX ===================== */}
        <nav className="flex-1 px-3 pb-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2 space-y-1 shadow-lg shadow-black/20">

            {MENU.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'text-gray-100 hover:bg-white/15 hover:text-white'
                  }`
                }
              >
                <item.icon size={18} />
                <span className="truncate">{item.name}</span>
                <ChevronRight size={14} className="ml-auto opacity-50" />
              </NavLink>
            ))}

            {/* ===================== ADMIN UPLOAD ===================== */}
            {user?.role === 'admin' ? (
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-300 border-t border-white/10 mt-1 pt-3 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'text-gray-100 hover:bg-white/15 hover:text-white'
                  }`
                }
              >
                <Upload size={18} />
                <span className="truncate">Admin Upload</span>
                <ChevronRight size={14} className="ml-auto opacity-50" />
              </NavLink>
            ) : (
              /* Temporary test — hata sakte ho */
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-300 border-t border-white/10 mt-1 pt-3 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'text-gray-100 hover:bg-white/15 hover:text-white'
                  }`
                }
              >
                <Upload size={18} />
                <span className="truncate">Admin Upload</span>
                <ChevronRight size={14} className="ml-auto opacity-50" />
              </NavLink>
            )}

          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;