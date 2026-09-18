import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { poApi } from '../api/poApi';
import PieChart from '../components/PieChart';
import { useAuth } from '../context/AuthContext';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import EditPOModal from '../components/EditPOModal'; // NEW IMPORT

// Helper to group plant codes
const getPlantGroup = (code) => {
  const c = String(code || '').trim();
  if (c === '1079' || c === '2401') return 'CBCMP';
  if (c === '1078' || c === '2404') return 'KDCMP';
  return c || 'Unknown';
};

const Dashboard = () => {
  const { user } = useAuth();
  
  const [allPos, setAllPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedPlantGroup, setSelectedPlantGroup] = useState(null); 
  const [selectedPlant, setSelectedPlant] = useState(null);           
  const [selectedEnqType, setSelectedEnqType] = useState(null);       

  // NEW: States for Edit/Delete
  const [editingPO, setEditingPO] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  // Refactored fetchData so it can be reused
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedPlantGroup(null);
    setSelectedPlant(null);
    setSelectedEnqType(null);
    setPage(1);
  }, [search]);

  // NEW: Handle Delete Action
  const handleDelete = async (id, poNo) => {
    if (window.confirm(`Are you sure you want to permanently delete PO: ${poNo}?`)) {
      setIsDeleting(id);
      try {
        await poApi.deletePO(id);
        await fetchData(); // Refresh table
      } catch (err) {
        alert("Failed to delete PO: " + (err.response?.data?.error || err.message));
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // NEW: Handle Save from Modal
  const handleSaveEdit = async () => {
    setEditingPO(null);
    await fetchData(); // Refresh table
  };

  // --- Filtering Logic (Same as before) ---
  const searchFilteredData = useMemo(() => {
    return allPos.filter(po => {
      const searchLower = search.toLowerCase();
      return !search || 
        (po.po_no && String(po.po_no).toLowerCase().includes(searchLower)) ||
        (po.agency && po.agency.toLowerCase().includes(searchLower)) ||
        (po.name_of_work && po.name_of_work.toLowerCase().includes(searchLower));
    });
  }, [allPos, search]);

  const plantGroupData = useMemo(() => {
    const counts = {};
    searchFilteredData.forEach(po => {
      const group = getPlantGroup(po.ord_plant);
      if (group && group !== 'Unknown') {
        counts[group] = (counts[group] || 0) + 1;
      }
    });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData]);

  const specificPlantData = useMemo(() => {
    if (!selectedPlantGroup) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData
      .filter(po => getPlantGroup(po.ord_plant) === selectedPlantGroup)
      .forEach(po => {
        const code = String(po.ord_plant || '').trim();
        if (code && code !== 'Unknown') {
          counts[code] = (counts[code] || 0) + 1;
        }
      });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlantGroup]);

  const enqTypeData = useMemo(() => {
    if (!selectedPlant) return { labels: [], data: [] };
    const counts = {};
    searchFilteredData
      .filter(po => String(po.ord_plant).trim() === String(selectedPlant).trim())
      .forEach(po => {
        const type = po.enq_type;
        if (type && type !== 'Unknown') {
          counts[type] = (counts[type] || 0) + 1;
        }
      });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }, [searchFilteredData, selectedPlant]);

  const tableData = useMemo(() => {
    return searchFilteredData.filter(po => {
      const matchesGroup = !selectedPlantGroup || getPlantGroup(po.ord_plant) === selectedPlantGroup;
      const matchesPlant = !selectedPlant || String(po.ord_plant).trim() === String(selectedPlant).trim();
      const matchesEnqType = !selectedEnqType || po.enq_type === selectedEnqType;
      return matchesGroup && matchesPlant && matchesEnqType;
    });
  }, [searchFilteredData, selectedPlantGroup, selectedPlant, selectedEnqType]);

  const total = tableData.length;
  const paginatedData = tableData.slice((page - 1) * limit, page * limit);

  const getTitle = () => {
    if (!selectedPlantGroup) return 'Ord. Plant Group Overview';
    if (!selectedPlant) return `Plant Code Distribution - ${selectedPlantGroup}`;
    if (!selectedEnqType) return `Enq Type Distribution - Plant ${selectedPlant}`;
    return `Purchase Orders - ${selectedPlantGroup} / ${selectedPlant} / ${selectedEnqType}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      
      <LeftSidebar />

      <div className="flex-1 min-w-0">
        
        {user && (
            <></>
          
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
          
          {(selectedPlantGroup || selectedPlant || selectedEnqType) && (
            <button 
              onClick={() => {
                if (selectedEnqType) setSelectedEnqType(null);
                else if (selectedPlant) setSelectedPlant(null);
                else if (selectedPlantGroup) setSelectedPlantGroup(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {!selectedPlantGroup && (
            <PieChart 
              title="Click on a Plant Group to view specific plant codes" 
              labels={plantGroupData.labels} 
              data={plantGroupData.data} 
              onClick={(label) => setSelectedPlantGroup(label)}
            />
          )}

          {selectedPlantGroup && !selectedPlant && (
            <PieChart 
              title={`Plant Codes for ${selectedPlantGroup} (Click to view Enq Types)`}
              labels={specificPlantData.labels} 
              data={specificPlantData.data} 
              onClick={(label) => setSelectedPlant(label)}
            />
          )}

          {selectedPlant && !selectedEnqType && (
            <PieChart 
              title={`Enq Type Distribution for Plant ${selectedPlant} (Click to view POs)`}
              labels={enqTypeData.labels} 
              data={enqTypeData.data} 
              onClick={(label) => setSelectedEnqType(label)}
            />
          )}
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">
              {selectedEnqType ? `${selectedEnqType} Purchase Orders` : 'Live Purchase Orders'}
            </h2>
            <input
              type="text"
              placeholder="Search PO, Agency, Work..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); }}
              className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
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
                  {/* NEW: Actions Header */}
                  {user?.role === 'admin' && (
                    <th className="px-6 py-3 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={user?.role === 'admin' ? 7 : 6} className="text-center py-10">Loading data...</td></tr>
                ) : paginatedData.length === 0 ? (
                  <tr><td colSpan={user?.role === 'admin' ? 7 : 6} className="text-center py-10">No records found.</td></tr>
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
                      
                      {/* NEW: Actions Data */}
                      {user?.role === 'admin' && (
                        <td className="px-6 py-4 text-right flex justify-end gap-3">
                          <button 
                            onClick={() => setEditingPO(po)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(po.id, po.po_no)}
                            disabled={isDeleting === po.id}
                            className="text-red-600 hover:text-red-800 font-medium text-xs transition-colors disabled:opacity-50"
                          >
                            {isDeleting === po.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} records
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50 text-sm"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Page {page} of {Math.ceil(total / limit) || 1}
              </span>
              <button 
                disabled={page >= Math.ceil(total / limit)} 
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <RightSidebar />

      {/* NEW: Render Edit Modal when editingPO is not null */}
      {editingPO && (
        <EditPOModal 
          po={editingPO} 
          onClose={() => setEditingPO(null)} 
          onSave={handleSaveEdit} 
        />
      )}
      
    </div>
  );
};

export default Dashboard;