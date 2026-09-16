import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Directory', path: '/directory' },
    { name: 'Departments', path: '/departments' },
    { name: 'Corporate Links', path: '/corporate-links' },
    { name: 'Circulars & Guidelines', path: '/circulars' },
    { name: 'DOP', path: '/dop' },
    { name: 'DSR', path: '/dsr' },
    { name: 'GCC', path: '/gcc' },
    { name: 'Manuals & Standards', path: '/manuals' },
  ];

  const handleHomeClick = (e, item) => {
    if (item.name === 'Home') {
      e.preventDefault();
      // Direct home
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="w-full bg-white px-6 py-3 flex justify-between items-center">
        <Link to="/"><img src="/ntpc-logo.png" alt="NTPC" className='w-28 object-contain' /></Link>
        <h1 className="text-center leading-tight">
          <span className="block text-[#0b70e2] font-semibold text-[26px] font-serif">SHARED SERVICE SITE C&M</span>
          <span className="block text-[#39aef3] font-semibold text-[26px] font-serif">CBCMP & KDCMP</span>
        </h1>
        <div className="flex flex-col items-center gap-1.5">
          <img src="/nml_logo.png" alt="NML" className='w-24 object-contain' />
          <div className="flex gap-1.5">
            {user? (
              <>
                <Link to="/upload" className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px]">Admin Upload</Link>
                <button onClick={logout} className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px]">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px]">LOGIN</Link>
            )}
          </div>
        </div>
      </div>

      <nav className="w-full bg-gradient-to-r from-[#0f2e9e] to-[#1e85ec] text-white text-[13px] font-medium">
        <div className="px-6 py-2 flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleHomeClick(e, item)}
              className={`px-4 py-2 rounded-full hover:bg-white/20 whitespace-nowrap ${location.pathname === item.path? 'bg-white/25 font-bold' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;