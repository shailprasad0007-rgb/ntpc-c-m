import React from 'react';

// Modern SVG Icons (No extra library required)
const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  building: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

// ============================================
// PUBLIC FOLDER IMAGES (yahan apni image ka naam likho)
// ============================================
const imageIcons = {
  emarketplace: '/images/gem.png',   // public/images/emarketplace.png
  gepnic: '/images/gepnic.png',               // public/images/gepnic.png
  ussc: '/images/USSC.png',                   // public/images/ussc.png
  estring: '/images/eString.png',             // public/images/estring.png
};

const apps = [
  { name: 'Govt. e-Marketplace', image: imageIcons.emarketplace, color: 'text-orange-600', bg: 'bg-orange-50', url: 'https://gem.gov.in/' },
  { name: 'GePNIC Portal', image: imageIcons.gepnic, color: 'text-purple-600', bg: 'bg-purple-50', url: 'https://eprocurentpc.nic.in/nicgep/app' },
  { name: 'USSC Dashboard', image: imageIcons.ussc, color: 'text-blue-600', bg: 'bg-blue-50', url: 'http://10.4.8.75/English/Default.aspx' },
  { name: 'CBCMP Sangam Portal', icon: icons.users, color: 'text-emerald-600', bg: 'bg-emerald-50', url: 'https://sangam.ntpc.co.in/v2/sites/cbcmp/' },
  { name: 'Corporate C&M', icon: icons.users, color: 'text-emerald-600', bg: 'bg-emerald-50', url: 'https://10.0.8.168/cs/csind.php/' },
  { name: 'VDC', icon: icons.users, color: 'text-emerald-600', bg: 'bg-emerald-50', url: 'https://vdc.ntpc.co.in/' },
  { name: 'E-String', image: imageIcons.estring, color: 'text-cyan-600', bg: 'bg-cyan-50', url: 'https://mcode.ntpc.co.in:8082/' },
  { name: 'QR Cell', icon: icons.users, color: 'text-emerald-600', bg: 'bg-emerald-50', url: 'https://10.0.20.98/qrdata/' },
];

const LeftSidebar = () => {
  return (
    <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 grid grid-cols-2 gap-3">
          {apps.map((app, index) => (
            <a
              key={index}
              href={app.url}
              target={app.url !== '#' ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-xl hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
            >
              <div className={`absolute inset-0 ${app.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`relative z-10 w-11 h-11 rounded-xl ${app.bg} flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-sm overflow-hidden`}>
                {app.image ? (
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <span className={app.color}>{app.icon}</span>
                )}
              </div>
              <span className="relative z-10 text-[11px] font-semibold text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                {app.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;