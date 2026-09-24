const KpiCard = ({ title, value, icon, growth, type }) => {
  const styles = {
    blue: "border-blue-200 bg-blue-50 text-blue-600",
    green: "border-green-200 bg-green-50 text-green-600",
    purple: "border-purple-200 bg-purple-50 text-purple-600",
    orange: "border-orange-200 bg-orange-50 text-orange-600",
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all ${styles[type] || styles.blue} border-l-4`}>
      <div className="flex justify-between items-start">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm text-xl`}>
          {icon}
        </div>
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${growth?.includes('+') || growth?.includes('12%')? 'bg-green-100 text-green-700' : growth?.includes('-')? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
          {growth} vs last month
        </span>
      </div>
      <div className="mt-3">
        <p className="text-[12px] text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
    </div>
  )
}
export default KpiCard