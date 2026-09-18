import React from 'react';

// Reusable card data to keep code clean and maintainable
const documents = [
  {
    id: 1,
    title: 'NTPC DOP',
    description: 'NTPC Delegation of Powers Manual 2026',
    file: '/NTPC-DOP.pdf', // Ensure this file is in your public folder
    theme: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hoverBg: 'group-hover:bg-blue-600',
    border: 'border-blue-100',
    btnHover: 'hover:bg-blue-600',
  },
  {
    id: 2,
    title: 'NML DOP',
    description: 'NML Revised Delegation of Powers (Office Order 03/2026-2027)',
    file: '/NML-DOP.pdf', // Ensure this file is in your public folder
    theme: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    border: 'border-emerald-100',
    btnHover: 'hover:bg-emerald-600',
  },
];

const DopPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Delegation of Powers (DOP)</h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Access the official Delegation of Powers manuals for NTPC and NML. You can view the document online or download it for offline reference.
          </p>
        </div>

        {/* PDF Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${doc.bg} rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl ${doc.bg} flex items-center justify-center mb-6 ${doc.hoverBg} transition-colors duration-300 shadow-sm`}>
                <svg className={`w-10 h-10 ${doc.text} group-hover:text-white transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              {/* Text */}
              <h2 className={`text-2xl font-bold text-gray-800 mb-2 group-hover:${doc.text.replace('text', 'text')} transition-colors`}>{doc.title}</h2>
              <p className="text-sm text-gray-500 mb-8">{doc.description}</p>
              
              {/* Action Buttons */}
              <div className="mt-auto flex w-full gap-3">
                {/* View Button */}
                <a 
                  href={doc.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 ${doc.btnHover} hover:text-white hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  View
                </a>

                {/* Download Button */}
                <a 
                  href={doc.file} 
                  download={`${doc.title.replace(' ', '-')}.pdf`}
                  className={`flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 ${doc.btnHover} hover:text-white hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Help Note */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>If the document does not open, please ensure the PDF files are placed in the <code>public</code> folder.</p>
        </div>

      </div>
    </div>
  );
};

export default DopPage;