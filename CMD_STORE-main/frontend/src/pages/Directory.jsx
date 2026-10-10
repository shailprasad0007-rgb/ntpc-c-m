// src/pages/Directory.jsx
const DIRECTORY_DATA = [
  {
    department: 'Contract & Materials',
    head: 'Shri A. K. Sharma',
    designation: 'GM (C&M)',
    phone: '+91-XXXXX-XXXXX',
    email: 'ak.sharma@ntpc.co.in',
  },
  {
    department: 'Procurement',
    head: 'Shri R. K. Verma',
    designation: 'DGM (Procurement)',
    phone: '+91-XXXXX-XXXXX',
    email: 'rk.verma@ntpc.co.in',
  },
  {
    department: 'Contracts',
    head: 'Shri S. K. Patel',
    designation: 'AGM (Contracts)',
    phone: '+91-XXXXX-XXXXX',
    email: 'sk.patel@ntpc.co.in',
  },
  {
    department: 'Materials Management',
    head: 'Shri M. K. Singh',
    designation: 'DGM (MM)',
    phone: '+91-XXXXX-XXXXX',
    email: 'mk.singh@ntpc.co.in',
  },
];

const Directory = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <span className="font-semibold text-blue-700">Home</span>
          <span>›</span>
          <span>Directory</span>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">C&M Directory</h1>
          <p className="text-xs text-gray-500 mb-5">Contract & Materials Department Contacts</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">Department</th>
                  <th className="px-4 py-3 font-semibold">Head</th>
                  <th className="px-4 py-3 font-semibold">Designation</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DIRECTORY_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/40 transition">
                    <td className="px-4 py-3 font-semibold text-gray-800">{row.department}</td>
                    <td className="px-4 py-3 text-gray-700">{row.head}</td>
                    <td className="px-4 py-3 text-gray-700">{row.designation}</td>
                    <td className="px-4 py-3 text-gray-500">{row.phone}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">
                        {row.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;