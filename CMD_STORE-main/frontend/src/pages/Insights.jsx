// src/pages/Insights.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import OperationalInsights from '../components/OperationalInsights';

const deriveStatus = (po) => {
  if (po.status) return po.status;
  if (!po.ord_plant || !po.agency) return 'Pending';
  const days = parseInt(po.pr_po_days) || 0;
  if (days > 60) return 'In Progress';
  return 'Approved';
};

const Insights = () => {
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

  const insights = useMemo(() => {
    const total = allPos.length;
    const onTime = allPos.filter((po) => (Number(po.pr_po_days) || 0) <= 30).length;
    return {
      onTime,
      onTimePct: total > 0 ? Math.round((onTime / total) * 100) : 0,
      pending: allPos.filter((po) => deriveStatus(po) === 'Pending').length,
      highValue: allPos.filter((po) => (Number(po.value_inr) || 0) > 1000000).length,
      mou: allPos.filter((po) => po.enq_type === 'MOU').length,
    };
  }, [allPos]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto px-4 py-5">

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm w-fit mb-5">
          <Link to="/" className="font-semibold text-blue-700 hover:underline">Home</Link>
          <span>›</span>
          <span>Operational Insights</span>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 max-w-2xl">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : (
            <OperationalInsights stats={insights} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;