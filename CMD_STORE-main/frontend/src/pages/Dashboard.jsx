import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import PieChart from '../components/PieChart';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // State for full data and drill-down
  const [allPos, setAllPos] = useState([]); // Stores all fetched POs for charting
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Drill-down states
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedEnqType, setSelectedEnqType] = useState(null);

  // Fetch ALL data once for charting and local filtering
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch a large limit to get all data for charts. 
        // Note: In a real production app, you should create a backend endpoint for stats.
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

  // Reset drill-down when search changes
  useEffect(() => {
    setSelectedPlant(null);
    setSelectedEnqType(null);
    setPage(1);
  }, [search]);

  // Filter data based on search and drill-down selections
  const filteredData = useMemo(() => {
    return allPos.filter(po => {
      // 1. Search Filter
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));

      // 2. Drill-down Filters
      const matchesPlant = !selectedPlant || po.ord_plant === selectedPlant;
      const matchesEnqType = !selectedEnqType || po.enq_type === selectedEnqType;

      return matchesSearch && matchesPlant && matchesEnqType;
    });
  }, [allPos, search, selectedPlant, selectedEnqType]);

  // Calculate Ord. Plant Data (Level 1)
  const ordPlantData = useMemo(() => {
    const counts = {};
    // Only use data that matches the search
    const searchFiltered = allPos.filter(po => {
      const searchLower = search.toLowerCase();
      return !search || 
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
    });
    
    searchFiltered.forEach(po => {
      const plant = po.ord_plant || 'Unknown';
      counts[plant] = (counts[plant] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      data: Object.values(counts),
    };
  }, [allPos, search]);

  // Calculate Enq Type Data for the selected Plant (Level 2)
  const enqTypeDataForPlant = useMemo(() => {
    if (!selectedPlant) return { labels: [], data: [] };
    
    const counts = {};
    // Filter by search AND selected plant
    const plantFiltered = allPos.filter(po => {
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        (po.po_no && po.po_no.toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
      
      return matchesSearch && po.ord_plant === selectedPlant;
    });

    plantFiltered.forEach(po => {
      const type = po.enq_type || 'Unknown';
      counts[type] = (counts[type] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      data: Object.values(counts),
    };
  }, [allPos, search, selectedPlant]);

  // Local Pagination for the table
  const total = filteredData.length;
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {user && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
          <span className="font-medium">Welcome, Admin! You have full access.</span>
          <Link to="/upload" className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition">
            Upload Excel File
          </Link>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {!selectedPlant ? 'Ord. Plant Overview' : 
           !selectedEnqType ? `Enq Type Distribution - Plant ${selectedPlant}` : 
           `Purchase Orders - Plant ${selectedPlant} / ${selectedEnqType}`}
        </h1>
        
        {/* Back Button for Drill-down */}
        {(selectedPlant || selectedEnqType) && (
          <button 
            onClick={() => {
              if (selectedEnqType) setSelectedEnqType(null);
              else setSelectedPlant(null);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back
          </button>
        )}
      </div>

      {/* Charts Section - Conditional Rendering */}
      <div className="bg-[#dbeafe] rounded-[16px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#b8d1ff] overflow-hidden">
        {!selectedPlant && (
          <PieChart 
            title="Click on a Plant to view Enq Type distribution" 
            labels={ordPlantData.labels} 
            data={ordPlantData.data} 
            onClick={(label) => setSelectedPlant(label)}
          />
        )}

        {selectedPlant && !selectedEnqType && (
          <PieChart 
            title={`Enq Type Distribution for Plant ${selectedPlant} (Click to view POs)`}
            labels={enqTypeDataForPlant.labels} 
            data={enqTypeDataForPlant.data} 
            onClick={(label) => setSelectedEnqType(label)}
          />
        )}
      </div>

      {/* Data Table Section */}
      <div className="bg-[#dbeafe] rounded-[16px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#b8d1ff] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            {selectedEnqType ? `${selectedEnqType} Purchase Orders` : 'Live Purchase Orders'}
          </h2>
          <input
            type="text"
            placeholder="Search PO, Agency, Work..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">PO No</th>
                <th className="px-6 py-3">Creator</th>
                <th className="px-6 py-3">Agency</th>
                <th className="px-6 py-3">Value (INR)</th>
                <th className="px-6 py-3">Enq Type</th>
                <th className="px-6 py-3">Ord. Plant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10">Loading data...</td></tr>
              ) : paginatedData.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10">No records found.</td></tr>
              ) : (
                paginatedData.map((po) => (
                  <tr key={po.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{po.po_no}</td>
                    <td className="px-6 py-4">{po.creator_name}</td>
                    <td className="px-6 py-4">{po.agency}</td>
                    <td className="px-6 py-4">{parseFloat(po.value_inr).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {po.enq_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{po.ord_plant}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} records
          </span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              Page {page} of {Math.ceil(total / limit) || 1}
            </span>
            <button 
              disabled={page >= Math.ceil(total / limit)} 
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50"
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