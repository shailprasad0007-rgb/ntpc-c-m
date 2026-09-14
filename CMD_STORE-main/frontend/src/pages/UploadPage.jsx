import { useState } from 'react';
import { poApi } from '../api/poApi';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus({ type: 'error', message: 'Please select a file.' });

    setIsUploading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await poApi.uploadExcel(file);
      setStatus({ type: 'success', message: response.data.message });
      setFile(null);
      e.target.reset();
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Error uploading file.' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Import Purchase Orders</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="mt-3 text-xs text-gray-400">Supported formats: .xlsx, .xls</p>
          </div>
          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {isUploading ? 'Processing...' : 'Upload & Insert Data'}
          </button>
        </form>
        {status.message && (
          <div className={`mt-6 p-4 rounded-lg text-sm font-medium border ${status.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;