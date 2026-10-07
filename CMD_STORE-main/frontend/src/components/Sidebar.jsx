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
  { name: 'Directory', path: '/directory/c-and-m', icon: Folder },
  { name: 'Important Links', path: '/important-links', icon: LinkIcon },
  { name: 'Circulars & Guidelines', path: '/circulars', icon: FileText },
  { name: 'DOP', path: '/dop', icon: TrendingUp },
  { name: 'DSR', path: '/dsr', icon: Database },
  { name: 'Manuals & Standards', path: '/manuals', icon: BookOpen },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside
      className="w-60 shrink-0 mt-4 ml-4 rounded-2xl sticky top-4  flex flex-col text-white border border-white/10 relative overflow-hidden shadow-xl"
      style={{
  backgroundImage: "url('/sidebar.jpg')",
  backgroundSize: 'cover 100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}}
    >
      {/* Content — image ke upar direct */}
      <div className="relative z-10 flex flex-col h-full w-full">

        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto sidebar-scroll mt-20">
          {MENU.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-2.5 text-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-gray-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <span className="truncate">{item.name}</span>
              <ChevronRight size={14} className="ml-auto opacity-40" />
            </NavLink>
          ))}

          {/* Admin Upload — sirf admin ko */}
          {user?.role === 'admin' && (
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-2.5 text-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-gray-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Upload size={18} />
              <span className="truncate">Admin Upload</span>
            </NavLink>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;