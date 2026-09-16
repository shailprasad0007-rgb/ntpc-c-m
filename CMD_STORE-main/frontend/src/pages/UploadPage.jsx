import { useState } from 'react';
import { poApi } from '../api/poApi';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please choose a file first!');
      return;
    }
    setLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await poApi.upload(formData);
      setMessage(res.data.message || 'Upload successful!');
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-[18px] font-bold text-[#0e2e9c] text-center mb-4">
          Import Purchase Orders
        </h1>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md border border-[#c7d2fe] p-6 max-w-[480px] mx-auto mt-16">

          {/* Dashed Box */}
          <div className="border-2 border-dashed border-[#93c5fd] bg-[#f8faff] rounded-xl p-6 text-center hover:bg-[#eff6ff] transition">
            <div className="flex items-center gap-3 justify-center mb-2">
              <label className="bg-[#e0e7ff] text-[#0e2e9c] px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer hover:bg-[#c7d2fe]">
                Choose file
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <span className="text-[13px] text-[#334155] truncate">
                {file? file.name : 'No file chosen'}
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] mt-3">
              Supported formats:.xlsx,.xls
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-5 bg-[#0e2e9c] text-white py-2.5 rounded-full font-bold text-[14px] hover:bg-[#0a1e6b] disabled:opacity-50 shadow-md transition"
          >
            {loading? 'Uploading...' : 'Upload & Insert Data'}
          </button>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${message.includes('success')? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;