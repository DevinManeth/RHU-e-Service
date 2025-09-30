import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../componets/Navbar';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// map db status -> UI label + badge color
function prettyStatus(s) {
  switch ((s || '').toLowerCase()) {
    case 'waiting': return { label: 'waiting', cls: 'bg-yellow-100 text-yellow-800' };
    case 'processing': return { label: 'processing', cls: 'bg-blue-100 text-blue-800' };
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
      username: a.username,
  requestId: a.requestId,
  type: a.type,
      submittedDate: a.subDate ? new Date(a.subDate).toLocaleDateString() : '-',
      description: a.desc || (a.type === 'truecopy' ? 'Request Truecopy degree certificate' : 'Request transcript'),
      estimatedDate: a.estDate ? new Date(a.estDate).toLocaleDateString() : '-',
      status: prettyStatus(a.status),
    }));
  }, [rows]);

  // Generate a simple transcript PDF client-side and trigger download
  const generateAndDownloadPdf = async (username) => {
    try {
      if (!username) return alert('No username provided');
      const { data: res } = await api.get(`/results/${username}`);
      // Build courses array from returned object (keys like COM1112 etc.)
      const docObj = res || {};
      const courses = Object.keys(docObj)
        .filter(k => /^(COM|MAT|AMT)/i.test(k))
        .map(code => ({ code, grade: (docObj[code] || '').toString() }));

      const name = docObj.Name || docObj.name || '';
      const indexNo = docObj.IndexNo || docObj.indexNo || '';
      const degree = docObj.degree || 'Bachelor Degree';

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('University of Ruhuna', 105, 20, { align: 'center' });
      doc.setFontSize(14);
      doc.text('Academic Transcript', 105, 30, { align: 'center' });

      doc.setFontSize(11);
      doc.text(`Name: ${name}`, 20, 50);
      doc.text(`Index No: ${indexNo}`, 20, 60);
      doc.text(`Degree Program: ${degree}`, 20, 70);

      let yPos = 90;
      doc.setFontSize(10);
      // headers
      doc.text('Course', 25, yPos);
      doc.text('Grade', 140, yPos);
      yPos += 8;

      if (courses.length === 0) {
        doc.text('No course records found.', 20, yPos);
      } else {
        courses.forEach(c => {
          if (yPos > 260) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(c.code, 25, yPos);
          doc.text((c.grade || '-').toString(), 140, yPos);
          yPos += 8;
        });
      }

      const today = new Date().toLocaleDateString();
      doc.setFontSize(9);
      doc.text(`Generated on: ${today}`, 20, 285);

      doc.save(`Result_Sheet_${indexNo || username}.pdf`);
    } catch (e) {
      console.error('Failed generating PDF', e);
      alert(e?.response?.data?.message || 'Failed to generate PDF');
    }
  };

  // If this is a truecopy request, download the stored uploaded file(s) instead
  const downloadTruecopyFiles = async (requestId) => {
    try {
      if (!requestId) return alert('no request id');
      const { data } = await api.get(`/requests/${requestId}`);
      const requestDoc = data?.request;
      if (!requestDoc) return alert('No request data available');

  // Use degree copy only for truecopy requests (do not use payment receipt)
  const filePath = requestDoc.degreeCopyPath;
      if (!filePath) return alert('No uploaded file found for this request');

      // server serves uploads at /uploads/<filename> (express static)
      // filePath may already be a path like "uploads/1759_foo.jpg" or an absolute path
      const filename = filePath.split(/[\\/]/).pop();
      const url = `http://localhost:5000/uploads/${filename}`;
      // open in new tab to download / view
      window.open(url, '_blank');
    } catch (e) {
      console.error('Failed to download truecopy file', e);
      alert('Failed to download file');
    }
  };

    // Generate a formal 'Certified True Copy' certificate PDF
    const generateTruecopyPdf = async (requestId) => {
      try {
        if (!requestId) return alert('no request id');
        const { data } = await api.get(`/requests/${requestId}`);
        const req = data?.request;
        if (!req) return alert('No request data available');

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(18);
        doc.text('UNIVERSITY OF RUHUNA', pageWidth / 2, 70, { align: 'center' });
        doc.setFontSize(14);
        doc.text('Office of the Registrar', pageWidth / 2, 92, { align: 'center' });

        // Certificate title
        doc.setFontSize(20);
        doc.text('CERTIFIED TRUE COPY', pageWidth / 2, 150, { align: 'center' });

        // Body
        doc.setFontSize(12);
        let y = 190;
        const lineHeight = 18;

        doc.text(`This is to certify that the documents submitted by the applicant are true copies of the original.`, 40, y);
        y += lineHeight * 1.5;

        doc.text(`Name: ${req.fullName || req.fullname || req.fullname || ''}`, 40, y); y += lineHeight;
        doc.text(`Student ID: ${req.studentId || ''}`, 40, y); y += lineHeight;
        doc.text(`Faculty: ${req.faculty || ''}`, 40, y); y += lineHeight;
        doc.text(`Degree Program: ${req.degreeProgram || ''}`, 40, y); y += lineHeight;
        doc.text(`Graduation Year: ${req.graduationYear || ''}`, 40, y); y += lineHeight * 2;

  // Reference uploaded degree copy file only (ignore payment receipt)
  const filePath = req.degreeCopyPath;
        if (filePath) {
          const filename = filePath.split(/[\\/]/).pop();
          const url = `http://localhost:5000/uploads/${filename}`;
          doc.text(`Original attached file: ${filename}`, 40, y); y += lineHeight;
          doc.text(`You may verify the original at: ${url}`, 40, y); y += lineHeight * 2;
        }

        // Certification statement and signature block
        doc.text('Certified by:', 40, y); y += lineHeight * 1.2;
        doc.text('..................................................', 40, y); y += lineHeight;
        doc.text('Registrar / Authorized Officer', 40, y); y += lineHeight * 2;

        const generatedOn = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${generatedOn}`, 40, doc.internal.pageSize.getHeight() - 40);

        doc.save(`Truecopy_Certificate_${requestId}.pdf`);
      } catch (err) {
        console.error('generateTruecopyPdf error', err);
        alert('Failed generating certificate');
      }
    };

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
                        </span>
                        {r.status.label === 'Completed' && (
                          r.type === 'transcript' ? (
                            <button
                              onClick={() => generateAndDownloadPdf(r.username)}
                              className="ml-3 inline-flex items-center px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download Transcript
                            </button>
                          ) : (
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => downloadTruecopyFiles(r.requestId)}
                                className="ml-3 inline-flex items-center px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Open File
                              </button>
                              <button
                                onClick={() => generateTruecopyPdf(r.requestId)}
                                className="ml-3 inline-flex items-center px-2 py-1 bg-teal-600 text-white rounded text-sm"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                                </svg>
                                Generate PDF
                              </button>
                            </div>
                          )
                        )}
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
