// src/pages/Finished.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default function Finished() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/activities", { params: { status: "completed" } });
        setRows(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load finished activities");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const table = useMemo(
    () =>
      rows.map((r, i) => ({
        key: r.requestId || i,
        no: String(i + 1).padStart(2, "0"),
        submittedDate: r.subDate ? new Date(r.subDate).toLocaleDateString() : "-",
        description: r.desc || (r.type === "truecopy"
          ? "Request Trucopy degree certificate"
          : "Request transcript"),
        raw: r,
      })),
    [rows]
  );

  const handleSendEmail = (req) => {
    // TODO: hook into your email flow
    alert(`Pretend sending email for request ${req.requestId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-700 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Finished activities</h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-6">Loading…</div>
          ) : err ? (
            <div className="p-6 text-red-600">{err}</div>
          ) : table.length === 0 ? (
            <div className="p-6 text-gray-600">No finished activities yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left">NO.</th>
                    <th className="px-6 py-4 text-left">submitted date</th>
                    <th className="px-6 py-4 text-left">Description</th>
                    <th className="px-6 py-4 text-left">Send</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {table.map((row) => (
                    <tr key={row.key} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{row.no}</td>
                      <td className="px-6 py-4">{row.submittedDate}</td>
                      <td className="px-6 py-4">{row.description}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSendEmail(row.raw)}
                          className="bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-800"
                        >
                          Send email
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
}
