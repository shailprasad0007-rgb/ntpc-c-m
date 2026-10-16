// src/pages/importantLinks.jsx
const LINKS_DATA = [
  {
    id: 1,
    title: 'NTPC HOME PAGE',
    url: 'https://www.ntpc.co.in',
    theme: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverBg: 'group-hover:bg-red-600',
    border: 'border-red-100',
    btnHover: 'hover:bg-red-600',
  },
  {
    id: 2,
    title: 'NML HOME PAGE', 
    url: 'https://www.nML.co.in',
    theme: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    border: 'border-emerald-100',
    btnHover: 'hover:bg-emerald-600',
  },
  {
    id: 3,
    title: 'NML SSC-C&M',
    url: 'https://www.nML.co.in',
    theme: 'orange',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hoverBg: 'group-hover:bg-orange-600',
    border: 'border-orange-100',
    btnHover: 'hover:bg-orange-600',
  },
  {
    id: 4,
    title: 'VDC',
    url: 'https://www.nML.co.in',
    theme: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hoverBg: 'group-hover:bg-blue-600',
    border: 'border-blue-100',
    btnHover: 'hover:bg-blue-600',
  },
  {
    id: 5,
    title: 'USSC',
    url: 'https://10.4.8.75/English/Defaut.aspx',
    theme: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverBg: 'group-hover:bg-red-600',
    border: 'border-red-100',
    btnHover: 'hover:bg-red-600',
  },
  {
    id: 6,
    title: 'E-String',
    url: 'https://www.nML.co.in',
    theme: 'purple',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hoverBg: 'group-hover:bg-purple-600',
    border: 'border-purple-100',
    btnHover: 'hover:bg-purple-600',
  },
  {
    id: 7,
    title: 'QR Cell',
    url: 'https://10.0.20.98/qrdata',
    theme: 'yellow',
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    hoverBg: 'group-hover:bg-yellow-600',
    border: 'border-yellow-100',
    btnHover: 'hover:bg-yellow-600',
  },
  {
    id: 8,
    title: 'Corporate C&M',
    url: 'https://10.0.8.168/CS/CSIND.php',
    theme: 'pink',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    hoverBg: 'group-hover:bg-pink-600',
    border: 'border-pink-100',
    btnHover: 'hover:bg-pink-600',
  },
  {
    id: 9,
    title: 'Gem Tender',
    url: 'https://www.ntpc.co.in',
    theme: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverBg: 'group-hover:bg-red-600',
    border: 'border-red-100',
    btnHover: 'hover:bg-red-600',
  },
  {
    id: 10,
    title: 'Govt. e-Marketplace',
    url: 'https://gem.gov.in/',
    theme: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverBg: 'group-hover:bg-red-600',
    border: 'border-red-100',
    btnHover: 'hover:bg-red-600',
  },
  {
    id: 11,
    title: 'GePNIC Portal',
    url: 'https://eprocurentpc.nic.in/nicgep/app',
    theme: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hoverBg: 'group-hover:bg-red-600',
    border: 'border-red-100',
    btnHover: 'hover:bg-red-600',
  },

];

const ImportantLinks = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#EDE0D3] via-[#F0C9C9] to-[#EBDFF2]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white bg-linear-to-r from-[#1717B0] to-[#34BDD9] px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <span className="font-semibold text-white">Home</span>
          <span>›</span>
          <span>Important Links</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Important Links</h1>
          <p className="text-xs text-gray-500 mb-6">Quick access to frequently used portals</p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {LINKS_DATA.map((item) => (
              <div
                key={item.id}
                className={`group flex items-center gap-4 p-5 rounded-2xl border ${item.border}  hover:bg-white hover:shadow-lg transition-all duration-300`}
              >
                {/* Icon circle */}
                <div
                  className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center shrink-0 transition-all duration-300 ${item.hoverBg}`}
                >
                  <svg
                    className={`w-7 h-7 ${item.text} group-hover:text-white transition-colors`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{item.title}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                </div>

                {/* Visit button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 px-4 py-2 rounded-lg ${item.bg} ${item.text} ${item.btnHover} hover:text-white text-xs font-bold transition-all`}
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantLinks;