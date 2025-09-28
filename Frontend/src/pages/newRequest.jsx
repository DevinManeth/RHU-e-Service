import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const NewRequest = () => {

    const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // fetch ALL activities (admin view)
        const { data } = await api.get('/activities', { params: { status: 'waiting' } });
        setRows(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : '-');

  const tableData = useMemo(
    () =>
      rows.map((r, idx) => ({
        key: r.requestId || idx,
        no: String(idx + 1).padStart(2, '0'),
        submittedDate: fmt(r.subDate),
        estimatedDate: fmt(r.estDate),
        description:
          r.desc ||
          (r.type === 'truecopy'
            ? 'Request Trucopy degree certificate'
            : 'Request transcript'),
        raw: r,
      })),
    [rows]
  );

  const handleViewForm = (req) => {
    console.log('View form:', req.requestId, req.type);
    navigate(`/requests/${req.requestId}`);
  };

   const handleProcess = async (req) => {
    try {
      await api.patch(`/activities/${req.requestId}/status`, { status: 'processing' });
      // 🔹 Remove from table (we only show waiting)
      setRows((prev) => prev.filter((r) => r.requestId !== req.requestId));
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to mark as processing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-teal-700 bg-opacity-90 text-white">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                RUH e-Service
              </h1>
              <nav className="space-x-8">
                <button 
                  onClick={() => navigate('/help')} 
                  className="text-white hover:text-teal-200 transition-colors"
                >
                  Help Me
                </button>
                <button 
                  onClick={() => navigate('/about')} 
                  className="text-white hover:text-teal-200 transition-colors"
                >
                  About Us
                </button>
                
              </nav>
            </div>
          </div>
        </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-teal-700 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Requests</h1>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-6">Loading…</div>
          ) : err ? (
            <div className="p-6 text-red-600">{err}</div>
          ) : tableData.length === 0 ? (
            <div className="p-6 text-gray-600">No requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NO.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">submitted date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estimated date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">View</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Click</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tableData.map((row) => (
                    <tr key={row.key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{row.no}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.submittedDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.estimatedDate}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewForm(row.raw)}
                          className="bg-teal-100 text-teal-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-200 transition-colors"
                        >
                          view form
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleProcess(row.raw)}
                          className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors"
                        >
                          Process
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
