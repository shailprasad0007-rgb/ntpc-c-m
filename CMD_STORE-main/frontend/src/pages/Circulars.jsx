// src/pages/Circulars.jsx
const CIRCULARS_DATA = [
  {
    id: 1,
    title: 'SCC C&M Circular',
    description: 'Updated procurement procedures and approval limits',
    link: '/https://10.0.8.168/cs/csind.php',
    theme: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hoverBg: 'group-hover:bg-blue-600',
    border: 'border-blue-100',
    btnHover: 'hover:bg-blue-600',
  },
  {
    id: 2,
    title: 'USSC Circular',
    description: 'Revised vendor registration and empanelment process',
    link: '/https://sangam.ntpc.co.in/V2/Portal/Department/58',
    theme: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    border: 'border-emerald-100',
    btnHover: 'hover:bg-emerald-600',
  },
  
   
];

const Circulars = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <span className="font-semibold text-blue-700">Home</span>
          <span>›</span>
          <span>Circulars & Guidelines</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Circulars & Guidelines</h1>
          <p className="text-xs text-gray-500 mb-6">Latest circulars and policy guidelines</p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CIRCULARS_DATA.map((item) => (
              <div
                key={item.id}
                className={`group flex items-center gap-4 p-5 rounded-2xl border ${item.border} bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300`}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{item.title}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                </div>

                {/* View button */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 px-4 py-2 rounded-lg ${item.bg} ${item.text} ${item.btnHover} hover:text-white text-xs font-bold transition-all`}
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circulars;