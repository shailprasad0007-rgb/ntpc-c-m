// src/pages/ImportantLinks.jsx
const LINKS_DATA = [
  {
    id: 1,
    title: 'NTPC HOME PAGE',
    url: 'https://www.ntpc.co.in',
    logo: '/ntpc_logo.jpg',              // ← image in public folder
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-100',
    hoverBorder: 'hover:border-red-300',
  },
  {
    id: 2,
    title: 'NML HOME PAGE',
    url: 'https://www.nml.co.in',
    logo: '/nml-log.png',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
  },
  {
    id: 3,
    title: 'NML SSC-C&M',
    url: 'https://www.nml.co.in',
    logo: '/ssc-logo.png',
    gradient: 'from-orange-500 to-amber-600',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-100',
    hoverBorder: 'hover:border-orange-300',
  },
  {
    id: 4,
    title: 'VDC',
    url: 'https://vdc.ntpc.co.in',
    logo: '/vdc-logo.png',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    id: 5,
    title: 'USSC',
    url: 'http://10.4.8.75/English/Default.aspx',
    logo: '/UCC.png',
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-100',
    hoverBorder: 'hover:border-red-300',
  },
  {
    id: 6,
    title: 'E-String',
    url: 'https://mcode.ntpc.co.in:8082/',
    logo: '/estring-logo.png',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-300',
  },
  {
    id: 7,
    title: 'QR Cell',
    url: 'http://10.0.20.98/qrdata',
    logo: '/qr-logo.png',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100',
    hoverBorder: 'hover:border-amber-300',
  },
  {
    id: 8,
    title: 'Corporate C&M',
    url: 'http://10.0.8.168/cs/csind.php',
    logo: '/corporate-cm-logo.png',
    gradient: 'from-pink-500 to-fuchsia-600',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-100',
    hoverBorder: 'hover:border-pink-300',
  },
  {
    id: 9,
    title: 'GEM Tender',
    url: 'http://gem.gov.in',
    logo: '/corporate-cm-logo.png',
    gradient: 'from-pink-500 to-fuchsia-600',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-100',
    hoverBorder: 'hover:border-pink-300',
  },
  {
    id: 10,
    title: 'GePNIC Portal',
    url: 'http://eprocurentpc.nic.in/nicgep/app',
    logo: '/corporate-cm-logo.png',
    gradient: 'from-pink-500 to-fuchsia-600',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-100',
    hoverBorder: 'hover:border-pink-300',
  },
];

const ImportantLinks = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#EDE0D3] via-[#F0C9C9] to-[#EBDFF2] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 py-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white bg-linear-to-r from-[#1717B0] to-[#34BDD9] px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <span className="font-semibold text-white">Home</span>
          <span>›</span>
          <span>Important Links</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LINKS_DATA.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white rounded-2xl border ${item.border} ${item.hoverBorder} p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}
            >
              {/* Top gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Decorative corner blob */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-15 group-hover:scale-110 transition-all duration-500`} />

              <div className="relative flex items-start gap-4">
                {/* Logo Container — IMAGE instead of SVG */}
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 overflow-hidden p-2`}>
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback: show a generic placeholder if image not found
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span class="${item.text} font-extrabold text-lg">${item.title.charAt(0)}</span>`;
                    }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* External arrow indicator */}
                <div className="shrink-0 w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Footer with Visit button */}
              <div className="relative mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Click to open portal
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold ${item.bg} ${item.text} group-hover:bg-gradient-to-r group-hover:${item.gradient} group-hover:text-white group-hover:shadow-md transition-all duration-300`}
                >
                  Visit
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          All links open in a new browser tab
        </div>

      </div>
    </div>
  );
};

export default ImportantLinks;