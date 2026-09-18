import { useState, useRef, useCallback } from 'react';
import { poApi } from '../api/poApi';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const isValidFile = (f) => f && /\.(xlsx|xls)$/i.test(f.name);

  const pickFile = (f) => {
    if (!f) return;
    if (!isValidFile(f)) {
      setStatus({ type: 'error', message: 'Only .xlsx or .xls files are supported.' });
      return;
    }
    setStatus({ type: '', message: '' });
    setFile(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    pickFile(dropped);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus({ type: 'error', message: 'Please select a file.' });

    setIsUploading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await poApi.uploadExcel(file);
      setStatus({ type: 'success', message: response.data.message });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error || 'Error uploading file.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Import Purchase Orders</h1>
          <p className="mt-1.5 text-sm text-gray-500">Upload an Excel file to bulk-insert purchase order records.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_20px_40px_-24px_rgba(15,23,42,0.15)] border border-gray-100 overflow-hidden">
          <form onSubmit={handleUpload} className="p-6 sm:p-8 space-y-6">
            {/* Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 border-2 border-dashed ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                  : file
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-gray-200 bg-gray-50/60 hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => pickFile(e.target.files[0])}
                className="hidden"
              />

              {!file ? (
                <>
                  {/* Upload icon */}
                  <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    <span className="text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1.5 text-xs text-gray-400">Excel files only — .xlsx or .xls</p>
                </>
              ) : (
                <div className="flex items-center gap-4 text-left" onClick={(e) => e.stopPropagation()}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!file || isUploading}
              className="relative w-full py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 disabled:cursor-not-allowed disabled:bg-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm shadow-blue-900/20 hover:shadow-md hover:shadow-blue-900/30 disabled:shadow-none active:scale-[0.99]"
            >
              <span className="flex items-center justify-center gap-2">
                {isUploading && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {isUploading ? 'Processing...' : 'Upload & Insert Data'}
              </span>
            </button>
          </form>

          {/* Status banner */}
          {status.message && (
            <div
              className={`mx-6 sm:mx-8 mb-6 sm:mb-8 -mt-2 p-4 rounded-xl text-sm font-medium border flex items-start gap-3 animate-[fadeIn_0.25s_ease-out] ${
                status.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {status.type === 'error' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <span>{status.message}</span>
            </div>
          )}
        </div>

        {/* Helper note */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Make sure column headers match the expected template before uploading.
        </p>
      </div>
    </div>
  );
};

export default UploadPage;