const InsightRow = ({ icon, iconBg, iconColor, title, subtitle }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
    <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
      <div className={iconColor}>{icon}</div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-700 truncate">{title}</p>
      <p className="text-[10px] text-gray-400 truncate">{subtitle}</p>
    </div>
    <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const OperationalInsights = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-gray-800">Operational Insights</h3>
      </div>

      <div className="space-y-1 flex-1">
        <InsightRow
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          title="POs Delivered On Time"
          subtitle={`${stats.onTime} · ${stats.onTimePct}% of total`}
        />
        <InsightRow
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          title="Pending for Approval (HOD)"
          subtitle={`${stats.pending} · Needs action`}
        />
        <InsightRow
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          title="High Value POs (> ₹10L)"
          subtitle={`${stats.highValue} · Review required`}
        />
        <InsightRow
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          title="Enquiry Type - MOU"
          subtitle={`${stats.mou} · In progress`}
        />
      </div>
    </div>
  );
};

export default OperationalInsights;