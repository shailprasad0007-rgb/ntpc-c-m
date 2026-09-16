import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import PieChart from '../components/PieChart';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedEnqType, setSelectedEnqType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const poRes = await poApi.getAll({ limit: 5000 });
        setAllPos(poRes.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedPlant(null);
    setSelectedEnqType(null);
    setPage(1);
  }, [search]);

  const filteredData = useMemo(() => {
    return allPos.filter(po => {
      const searchLower = search.toLowerCase();
      const matchesSearch =!search ||
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
      const matchesPlant =!selectedPlant || po.ord_plant === selectedPlant;
      const matchesEnqType =!selectedEnqType || po.enq_type === selectedEnqType;
      return matchesSearch && matchesPlant && matchesEnqType;
    });
  }, [allPos, search, selectedPlant, selectedEnqType]);

  const ordPlantData = useMemo(() => {
    const counts = {};
    const searchFiltered = allPos.filter(po => {
      const searchLower = search.toLowerCase();
      return!search ||
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
    });
    searchFiltered.forEach(po => {
      const plant = po.ord_plant || 'Unknown';
      counts[plant] = (counts[plant] || 0) + 1;
    });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [allPos, search]);

  const enqTypeDataForPlant = useMemo(() => {
    if (!selectedPlant) return { labels: [], data: [] };
    const counts = {};
    const plantFiltered = allPos.filter(po => {
      const searchLower = search.toLowerCase();
      const matchesSearch =!search ||
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
      return matchesSearch && po.ord_plant === selectedPlant;
    });
    plantFiltered.forEach(po => {
      const type = po.enq_type || 'Unknown';
      counts[type] = (counts[type] || 0) + 1;
    });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [allPos, search, selectedPlant]);

  const total = filteredData.length;
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-[#eef2ff] min-h-screen">
      {user && (
        <div className="bg-white border border-[#c7d2fe] text-[#0e2e9c] px-4 py-3 rounded-xl mb-6 flex justify-between items-center shadow-sm">
          <span className="font-bold text-10px">Welcome, Admin! You have full access.</span>
          <Link to="/upload" className="bg-[#0e2e9c] text-white px-5 py-1.5 rounded-full text-sm hover:bg-[#0a1e6b] transition font-medium">
            Upload Excel File
          </Link>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[18px] font-extrabold text-[#0e2e9c]">
          {!selectedPlant? 'ORD. PLANT OVERVIEW' :
          !selectedEnqType? `Enq Type Distribution - Plant ${selectedPlant}` :
           `Purchase Orders - Plant ${selectedPlant} / ${selectedEnqType}`}
        </h1>
        {(selectedPlant || selectedEnqType) && (
          <button
            onClick={() => {
              if (selectedEnqType) setSelectedEnqType(null);
              else setSelectedPlant(null);
            }}
            className="px-5 py-2 bg-[#0e2e9c] text-white rounded-full hover:bg-[#0a1e6b] transition flex items-center gap-2 text-sm font-bold shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back
          </button>
        )}
      </div>

      {/* Chart - White with blue border */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-[#c7d2fe] overflow-hidden">
        {!selectedPlant && (
          <PieChart
            title="CLICK ON A PLANT TO VIEW ENQ TYPE DISTRIBUTION"
            labels={ordPlantData.labels}
            data={ordPlantData.data}
            onClick={(label) => setSelectedPlant(label)}
          />
        )}
        {selectedPlant &&!selectedEnqType && (
          <PieChart
            title={`ENQ TYPE DISTRIBUTION FOR PLANT ${selectedPlant} (CLICK TO VIEW POS)`}
            labels={enqTypeDataForPlant.labels}
            data={enqTypeDataForPlant.data}
            onClick={(label) => setSelectedEnqType(label)}
          />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-[#c7d2fe] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#c7d2fe] flex justify-between items-center bg-[#dbeafe]">
          <h2 className="text-[14px] font-extrabold text-[#0e2e9c] uppercase tracking-wide">
            {selectedEnqType? `${selectedEnqType} Purchase Orders` : 'Live Purchase Orders'}
          </h2>
          <input
            type="text"
            placeholder="Search PO, Agency, Work..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            className="px-4 py-2 border border-[#93c5fd] bg-white rounded-full text-sm text-[#1e293b] focus:ring-2 focus:ring-[#0e2e9c]/20 focus:border-[#0e2e9c] outline-none w-64 shadow-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0e2e9c] text-white uppercase text-[11px]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">PO No</th>
                <th className="px-6 py-4 font-bold tracking-wider">Creator</th>
                <th className="px-6 py-4 font-bold tracking-wider">Agency</th>
                <th className="px-6 py-4 font-bold tracking-wider">Value (INR)</th>
                <th className="px-6 py-4 font-bold tracking-wider">Enq Type</th>
                <th className="px-6 py-4 font-bold tracking-wider">Ord. Plant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e7ff]">
              {loading? (
                <tr><td colSpan="6" className="text-center py-10 text-[#64748b]">Loading data...</td></tr>
              ) : paginatedData.length === 0? (
                <tr><td colSpan="6" className="text-center py-10 text-[#64748b]">No records found.</td></tr>
              ) : (
                paginatedData.map((po, index) => (
                  <tr key={po.id} className={index % 2 === 0? "bg-white hover:bg-[#eff6ff]" : "bg-[#f8faff] hover:bg-[#eff6ff]"}>
                    <td className="px-6 py-4 font-bold text-[#0e2e9c]">{po.po_no}</td>
                    <td className="px-6 py-4 text-[#334155] font-medium">{po.creator_name}</td>
                    <td className="px-6 py-4 text-[#334155]">{po.agency}</td>
                    <td className="px-6 py-4 text-[#1e293b] font-semibold">{parseFloat(po.value_inr).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[#0e2e9c] text-white rounded-full text-[11px] font-bold">
                        {po.enq_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#334155] font-medium">{po.ord_plant}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#c7d2fe] flex justify-between items-center bg-[#eff6ff]">
          <span className="text-sm text-[#0e2e9c] font-medium">
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} records
          </span>
          <div className="flex gap-2 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-1.5 border border-[#93c5fd] rounded-full bg-white disabled:opacity-50 hover:bg-[#dbeafe] text-sm text-[#0e2e9c] font-bold"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-[#0e2e9c] font-bold">
              Page {page} of {Math.ceil(total / limit) || 1}
            </span>
            <button
              disabled={page >= Math.ceil(total / limit)}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-1.5 border border-[#93c5fd] rounded-full bg-white disabled:opacity-50 hover:bg-[#dbeafe] text-sm text-[#0e2e9c] font-bold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;