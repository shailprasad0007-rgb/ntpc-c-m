// src/pages/Analysis.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import PoTimeAnalysis from '../components/PoTimeAnalysis';

const Analysis = () => {
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await poApi.getAll({ limit: 5000 });
        setAllPos(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <Link to="/" className="font-semibold text-blue-700 hover:underline">Home</Link>
          <span>›</span>
          <span>Time Analysis</span>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : (
            <PoTimeAnalysis pos={allPos} compact={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;