const AboutUs = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">

      {/* ===================== HERO HEADER ===================== */}
      <div className="relative bg-gradient-to-r from-[#0f2e9e] via-[#1e5fd0] to-[#1e85ec] rounded-2xl p-8 md:p-12 mb-6 overflow-hidden shadow-lg">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-24 -left-12 w-72 h-72 bg-white/5 rounded-full"></div>
        <div className="absolute top-6 right-24 w-16 h-16 bg-white/10 rounded-full"></div>

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase rounded-full mb-3">
            About the Department
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Contracts &amp; Materials (C&amp;M)
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-3xl leading-relaxed">
            A core functional department in NTPC driving transparency, cost-effectiveness,
            and global best practices across all procurement and contract activities.
          </p>
        </div>
      </div>

      {/* ===================== INTRO CARD ===================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              What does C&amp;M stand for?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-800">C&amp;M stands for Contracts &amp; Materials</strong> — a core functional
              department in NTPC that manages all activities related to contract formulation and award,
              procurement of equipment, spares, and services, vendor evaluation and tendering, and
              material planning, inventory control, and logistics.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              NTPC's procurement framework is built on a foundation of structured expertise that ensures
              <strong className="text-gray-800"> transparency, cost-effectiveness, and adherence to global best practices</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* ===================== SCOPE CARDS ===================== */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
          Core Responsibilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Contract Formulation',
              desc: 'Drafting, awarding, and managing contracts end-to-end.',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              tone: 'bg-blue-50 text-blue-600',
            },
            {
              title: 'Procurement',
              desc: 'Equipment, spares, services, and materials acquisition.',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              tone: 'bg-emerald-50 text-emerald-600',
            },
            {
              title: 'Vendor Evaluation',
              desc: 'Tendering, bid evaluation, and vendor selection.',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              tone: 'bg-purple-50 text-purple-600',
            },
            {
              title: 'Materials Mgmt.',
              desc: 'Inventory control, planning, and logistics.',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
              tone: 'bg-amber-50 text-amber-600',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${item.tone} flex items-center justify-center mb-3`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== KEY FUNCTIONS LIST ===================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Key Functions of the C&amp;M Department</h2>
            <p className="text-[11px] text-gray-400">
              Based on NTPC's procurement framework and tendering system
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: '01',
              title: 'Bidding Documents Preparation',
              desc: 'Preparation of bidding documents, including qualifying requirements and evaluation criteria.',
            },
            {
              num: '02',
              title: 'Techno-Commercial Evaluation',
              desc: 'Detailed techno-commercial bid evaluation and vendor selection as per prescribed guidelines.',
            },
            {
              num: '03',
              title: 'Materials & Equipment Procurement',
              desc: 'Procurement of materials and equipment for power plants — coal, spares, electrical systems, and mechanical components.',
            },
            {
              num: '04',
              title: 'Contract Management',
              desc: 'Award, monitoring, and compliance of all awarded contracts throughout their lifecycle.',
            },
            {
              num: '05',
              title: 'Inventory & Materials Management',
              desc: 'Efficient inventory and materials management at project and station levels.',
            },
            {
              num: '06',
              title: 'Transparency & Compliance',
              desc: 'Ensuring compliance with guidelines of agencies like the World Bank, ADB, KfW, etc., for international competitive bidding.',
            },
          ].map((fn, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-200 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-xs font-extrabold text-blue-600">{fn.num}</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-800 mb-1">{fn.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{fn.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== COMMITMENT FOOTER ===================== */}
      <div className="bg-gradient-to-r from-[#0b3d91] to-[#1e5fd0] rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-white/5 rounded-full"></div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white mb-2">
              Our Commitment
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              The C&amp;M Department at NTPC is committed to delivering procurement excellence
              through structured processes, ethical practices, and adherence to global standards —
              ensuring timely availability of quality materials and services to support the nation's
              power infrastructure.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;