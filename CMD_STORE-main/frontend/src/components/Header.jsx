import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleHomeClick = (e, item) => {
    if (item.name === 'Home') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Directory', path: '/directory', hasDropdown: true },
    { name: 'Important Links', path: '/important-links', hasDropdown: true },
    { name: 'Circulars & Guidelines', path: '/circulars', hasDropdown: true },
    { name: 'DOP', path: '/dop', hasDropdown: true },
    { name: 'DSR', path: '/dsr' },
    { name: 'Manuals & Standards', path: '/manuals', hasDropdown: true },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Tier: Logos & Auth - PEHLE JAISA HI */}
      <div className="w-full bg-white px-6 py-3 flex justify-between items-center border-b border-gray-100">
        <Link to="/"><img src="/ntpc-logo.png" alt="NTPC" className='w-22 object-contain' /></Link>
        <h1 className="text-center leading-tight">
          <span className="block text-[#0b70e2] font-semibold text-[26px] font-serif">SHARED SERVICE SITE C&M</span>
          <span className="block text-[#39aef3] font-semibold text-[26px] font-serif">CBCMP & KDCMP</span>
        </h1>
        <div className="flex flex-col items-center gap-1.5">
          <img src="/nml_logo.png" alt="NML" className='w-24 object-contain' />
          <div className="flex gap-1.5">
            {user? (
              <>
                <Link to="/upload" className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] shadow-sm">Admin Upload</Link>
                <button onClick={logout} className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] shadow-sm">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-[5px] rounded-full font-bold text-[11px] shadow-sm">LOGIN</Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Tier: Navigation Bar - Premium rakha hai */}
      <nav className="w-full bg-gradient-to-r from-[#0a2a6b] via-[#0b3d91] to-[#1565c0] text-white text-[13px] font-medium relative z-40 shadow-md">
        <div className="px-6 py-2 flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                onClick={(e) => handleHomeClick(e, item)}
                className={`px-4 py-2 rounded-full hover:bg-white/15 whitespace-nowrap flex items-center gap-1 transition-all duration-200 border border-transparent ${
                  location.pathname === item.path || activeDropdown === item.name? 'bg-white text-[#0b3d91] font-bold shadow-sm' : ''
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.name? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </Link>

              {item.hasDropdown && activeDropdown === item.name && (
                <div className="absolute top-full left-0 pt-3 w-72 z-50">
                  <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-fadeIn">
                    {item.name === 'Directory' && (
                      <Link to="/directory/c-and-m" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setActiveDropdown(null)}>
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">👥</div>
                        <span className="font-semibold">C & M Department</span>
                      </Link>
                    )}
                    {item.name === 'Important Links' && (
                      <>
                        <a href="https://www.ntpc.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-blue-50 border-b border-gray-50">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">🌐</div>
                          <span className="font-semibold">NTPC Home Page</span>
                        </a>
                        <a href="https://www.nml.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-orange-50">
                          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">🏢</div>
                          <span className="font-semibold">NML Home Page</span>
                        </a>
                      </>
                    )}
                    {item.name === 'DOP' && (
                      <>
                        <a href="/NTPC-DOP.pdf" target="_blank" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-red-50 border-b border-gray-50"><div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">📄</div><span className="font-semibold">NTPC DOP</span></a>
                        <a href="/NML-DOP.pdf" target="_blank" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-emerald-50"><div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">📄</div><span className="font-semibold">NML DOP</span></a>
                      </>
                    )}
                    {item.name === 'Manuals & Standards' && (
                      <>
                        <a href="/Purchase_Manual_2018.pdf" target="_blank" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-amber-50 border-b border-gray-50"><div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">📚</div><span className="font-semibold">Purchase Manual 2018</span></a>
                        <a href="/Stores_Manual_2018.pdf" target="_blank" className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:bg-rose-50"><div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center">📚</div><span className="font-semibold">Stores Manual 2018</span></a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};
export default Header;