import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" className={({isActive}) => `block px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          Dashboard
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/upload" className={({isActive}) => `block px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
            Upload Excel
          </NavLink>
        )}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;