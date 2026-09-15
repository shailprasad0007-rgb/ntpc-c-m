import { useState } from 'react';
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

  return (
    <header className=" bg-[#f1f5f9] px-3 pt-3 sticky top-0 z-50">

      <div className=" mx-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-3 flex flex-col md:flex-row justify-between items-center border border-white">

        {/*Logo import*/}
        <Link to="/" className="shrink-0 hover:opacity-90 transition">
          <img src="/ntpc-logo.png" alt="NTPC" className='w-28 object-contain' />
        </Link>

        <h1 className="text-center leading-tight">
          <span className="block text-[#0b70e2] font-semibold text-[26px] md:text-[30px] tracking-wide font-serif">SHARED SERVICE SITE C&M</span>
          <span className="block text-[#39aef3] font-semibold text-[26px] md:text-[30px] tracking-wide font-serif">CBCMP & KDCMP</span>
        </h1>

        <div className="flex flex-col items-center justify-center gap-1.5">
          <img src="/nml_logo.png" alt="NML" className='w-20 md:w-24 lg:w-[110px] h-auto object-contain' />

          <div className="flex items-center gap-2">
  {user? (
    <>
      <Link
        to="/upload"
        className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] leading-none tracking-wide shadow-md shadow-blue-500/20 hover:-translate-y-[1px] transition-all"
      >
        Admin Upload
      </Link>

      <button
        onClick={logout}
        className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] leading-none tracking-wide shadow-md shadow-blue-500/20 hover:-translate-y-[0.5px] transition-all"
      >
        Logout
      </button>
    </>
  ) : (
    <Link to="/login" className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] leading-none tracking-wide shadow-md shadow-blue-500/20 hover:-translate-y-[0.5px] transition-all flex items-center gap-1">
      <span className="bg-white/20 rounded-full p-0.5 text-[9px]">👤</span> LOGIN
    </Link>
  )}
</div>
        </div>
      </div>

      {/* Bottom Tier: Blue Navigation Bar*/}
      <nav className=" mx-auto mt-3 bg-gradient-to-r from-[#0f2e9e] to-[#1e90ff] text-white text-[13px] font-medium rounded-xl shadow-md shadow-blue-700/20 overflow-x-auto">
        <div className="px-2 py-1.5 flex items-center gap-1 whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer ${isActive? 'bg-white/25 shadow-inner font-bold' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;