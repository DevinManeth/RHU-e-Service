// src/pages/Process.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const Process = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [generatingId, setGeneratingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Admin view: only items currently "processing"
        const { data } = await api.get('/activities', { params: { status: 'processing' } });
        setRows(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : '-');

// const generateResultSheet = async (request) => {
//     try {
//       setGeneratingId(request.requestId);
      
//       // Fetch student results
//       const { data: studentResults } = await api.get(`/results/${request.username}`);
      
//       // Create PDF document
//       const doc = new jsPDF();
      
//       // Add university header
//       doc.setFontSize(20);
//       doc.text('University of Ruhuna', 105, 20, { align: 'center' });
//       doc.setFontSize(16);
//       doc.text('Academic Transcript', 105, 30, { align: 'center' });
      
//       // Add student information
//       doc.setFontSize(12);
//       doc.text(`Name: ${studentResults.name}`, 20, 50);
//       doc.text(`Index No: ${studentResults.indexNo}`, 20, 60);
//       doc.text(`Degree Program: ${studentResults.degree || 'Bachelor of Science'}`, 20, 70);
      
//       // Add results table
//       let yPos = 90;
//       doc.setFontSize(10);
      
//       // Table headers
//       doc.rect(20, yPos - 5, 170, 10);
//       doc.text('Course Code', 25, yPos);
//       doc.text('Course Name', 65, yPos);
//       doc.text('Grade', 150, yPos);
//       doc.text('Credits', 170, yPos);
      
//       yPos += 10;
      
//       // Add results
//       if (studentResults.courses && studentResults.courses.length > 0) {
//         studentResults.courses.forEach((course) => {
//           doc.rect(20, yPos - 5, 170, 10);
//           doc.text(course.code, 25, yPos);
//           doc.text(course.name, 65, yPos);
//           doc.text(course.grade, 150, yPos);
//           doc.text(course.credits.toString(), 170, yPos);
//           yPos += 10;
//         });
//       }
      
//       // Add GPA
//       yPos += 10;
//       doc.setFontSize(12);
//       doc.text(`GPA: ${studentResults.gpa || '0.00'}`, 20, yPos);
      
//       // Add footer
//       doc.setFontSize(10);
//       const today = new Date().toLocaleDateString();
//       doc.text(`Generated on: ${today}`, 20, 280);
//       doc.text('This is a computer generated document', 105, 280, { align: 'center' });
      
//       // Save PDF
//       doc.save(`Result_Sheet_${studentResults.indexNo}.pdf`);
      
//       // Update request status
//       await api.patch(`/activities/${request.requestId}/status`, { status: 'completed' });
      
//       // Update UI
//       setRows((prev) => prev.filter((x) => x.requestId !== request.requestId));
      
//     } catch (error) {
//       console.error('Error generating result sheet:', error);
//       alert('Failed to generate result sheet. Please try again.');
//     } finally {
//       setGeneratingId(null);
//     }
//   };

  const tableData = useMemo(
    () =>
      rows.map((r, idx) => ({
        key: r.requestId || idx,
        no: String(idx + 1).padStart(2, '0'),
        submittedDate: fmt(r.subDate),
        description:
          r.desc ||
          (r.type === 'truecopy'
            ? 'Request Trucopy degree certificate'
            : 'Request transcript'),
        raw: r,
      })),
    [rows]
  );

  // Open the same details page you already use elsewhere
  const handleViewForm = (req) => {
    navigate(`/requests/${req.requestId}`);
  };

  // Mark as completed -> remove from this table
  const handleGenerate = async (req) => {
    //generateResultSheet(req);
    try {
      setGeneratingId(req.requestId); // show "Generated" immediately for this row
      await api.patch(`/activities/${req.requestId}/status`, { status: 'completed' });
      setRows((prev) => prev.filter((x) => x.requestId !== req.requestId));
      // Finished page will display it next time it loads (status is now "completed")
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to mark as completed');
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-teal-800 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">RUH e-Service</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:cursor-pointer">Help Me</a>
          <a href="#" className="hover:cursor-pointer">About Us</a>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-teal-700 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Process</h1>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-6">Loading…</div>
          ) : err ? (
            <div className="p-6 text-red-600">{err}</div>
          ) : tableData.length === 0 ? (
            <div className="p-6 text-gray-600">No processing items.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NO.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">submitted date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">View</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Generate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tableData.map((row) => (
                    <tr key={row.key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{row.no}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{fmt(row.raw.subDate)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.description}</td>
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
                          onClick={() => handleGenerate(row.raw)}
                          disabled={generatingId === row.raw.requestId}
                          className={
                            generatingId === row.raw.requestId
                              ? 'bg-red-300 text-red-900 px-4 py-2 rounded-md'
                              : 'bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700'
                          }
                        >
                          {generatingId === row.raw.requestId ? 'Generated' : 'Generate'}
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

export default Process;
