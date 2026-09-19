import React from 'react';

const staffMembers = [
  
  {
    id: 1,
    name: 'Prashant Kumar Gupta',
    role: 'ADDL. GENERAL MANAGER',
    grade: 'E8',
    department: 'C&M',
    organization: 'NML',
    location: 'CHATTI BARIATU',
    empId: '008434',
    mobile: '9650992993',
    intercom: '--',
    // Replace with actual image paths
    image: '/prashant.jpeg',
  },
  {
    id: 2,
    name: 'Prabhakar P',
    role: 'DY. GENERAL MANAGER',
    grade: 'E7',
    department: 'C&M',
    organization: 'NML',
    location: 'CHATTI BARIATU',
    empId: '009935',
    mobile: '9650997279',
    intercom: '--',
    // Replace with actual image paths
    image: '/pbr.jpg', 
  },
    {
    id: 3,
    name: 'Ashish Albert Kullu',
    role: 'Dy. GENERAL MANAGER',
    grade: 'E7',
    department: 'C&M',
    organization: 'NML',
    location: 'KERANDARI',
    empId: '101762',
    mobile: '9109178536',
    intercom: '--',
    // Replace with actual image paths
    image: '/.jpg', 
  },
  {
    id: 4,
    name: 'Mahendra Singh',
    role: 'MANAGER',
    grade: 'E5',
    department: 'C&M',
    organization: 'NML',
    location: 'CHATTI BARIATU',
    empId: '058069',
    mobile: '9416212392',
    intercom: '--',
    // Replace with actual image paths
    image: '/mahend.jpg', 
  },
  {
    id: 5,
    name: 'Jayant Prakash Sarvodaya',
    role: 'DEPUTY MANAGER',
    grade: 'E4',
    department: 'C&M',
    organization: 'NML',
    location: 'CHATTI BARIATU',
    empId: '043002',
    mobile: '9470197281',
    intercom: '--',
    // Replace with actual image paths
    image: '/jp.jpg', 
  },
    {
    id: 6,
    name: 'Padmalochan Behra',
    role: 'SR.ASSISTANT MANAGER',
    grade: 'E1',
    department: 'C&M',
    organization: 'NML',
    location: 'KERANDARI',
    empId: '253030',
    mobile: '9437489558',
    intercom: '--',
    // Replace with actual image paths
    image: '/.jpg', 
  },
];

const CmDepartment = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">C & M Department Directory</h1>
          <p className="mt-2 text-lg text-gray-500">Key Personnel and Contact Information</p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((staff) => (
            <div 
              key={staff.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative group"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

              <div className="p-6 flex flex-col items-center pt-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 z-10 relative">
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Profile'; }}
                    />
                  </div>
                </div>

                {/* Name */}
                <h2 className="mt-5 text-xl font-bold text-gray-800 text-center">{staff.name}</h2>

                {/* Badges */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {staff.role}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-600 border border-gray-200">
                    {staff.grade}
                  </span>
                </div>

                {/* Department & Location Info */}
                <div className="mt-5 flex flex-col items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    {staff.department}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {staff.location}
                  </div>
                </div>
              </div>

              {/* Bottom Contact Strip */}
              <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50">
                <div className="p-3 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Emp ID</p>
                  <p className="text-sm font-bold text-gray-800">{staff.empId}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mobile</p>
                  <p className="text-sm font-bold text-gray-800">{staff.mobile}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Intercom</p>
                  <p className="text-sm font-bold text-gray-800">{staff.intercom}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CmDepartment;