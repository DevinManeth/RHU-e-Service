import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../componets/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// map db status -> UI label + badge color
function prettyStatus(s) {
  switch ((s || '').toLowerCase()) {
    case 'waiting': return { label: 'waiting', cls: 'bg-yellow-100 text-yellow-800' };
    case 'processing': return { label: 'Ongoing', cls: 'bg-blue-100 text-blue-800' };
    case 'done':
    case 'completed': return { label: 'Completed', cls: 'bg-green-100 text-green-800' };
    case 'rejected': return { label: 'Rejected', cls: 'bg-red-100 text-red-800' };
    default: return { label: s || 'Unknown', cls: 'bg-gray-100 text-gray-800' };
  }
}

const OngoingActivities = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const username = user?.username;
        if (!username) {
          setErr('Not logged in (no username found).');
          setLoading(false);
          return;
        }
        const { data } = await api.get('/activities', { params: { username } });
        setRows(data.items || []);
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.message || 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatted = useMemo(() => {
    return (rows || []).map((a, i) => ({
      no: String(i + 1).padStart(2, '0'),
      submittedDate: a.subDate ? new Date(a.subDate).toLocaleDateString() : '-',
      description: a.desc || (a.type === 'truecopy' ? 'Request Truecopy degree certificate' : 'Request transcript'),
      estimatedDate: a.estDate ? new Date(a.estDate).toLocaleDateString() : '-',
      status: prettyStatus(a.status),
    }));
  }, [rows]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-teal-700 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Ongoing Activities</h1>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-6">Loading…</div>
          ) : err ? (
            <div className="p-6 text-red-600">{err}</div>
          ) : formatted.length === 0 ? (
            <div className="p-6 text-gray-600">No activities yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NO.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">submitted date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estimated date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formatted.map((r) => (
                    <tr key={r.no} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{r.no}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.submittedDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.estimatedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.status.cls}`}>
                          {r.status.label}
                          {r.status.label === 'Completed' && (
                            <button className="ml-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          )}
                        </span>
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

export default OngoingActivities;
