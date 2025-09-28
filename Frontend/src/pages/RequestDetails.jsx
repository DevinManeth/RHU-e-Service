// src/pages/RequestDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// simple extension check
function isImage(url = "") {
  return /\.(png|jpe?g|gif|webp|bmp|avif)$/i.test(url);
}

/**
 * Turn any stored value into a web URL under http://localhost:5000/uploads/...
 * Accepts:
 *   - "uploads/1758...jpg"
 *   - "/uploads/1758...jpg"
 *   - "C:\\repo\\Backend\\uploads\\1758...jpg"
 *   - "Backend/uploads/1758...jpg"
 *   - "1758...jpg"
 *   - already absolute "http://..." (returned unchanged)
 */
function buildReceiptUrl(raw) {
  if (!raw) return "";

  // already an absolute URL?
  if (/^https?:\/\//i.test(raw)) return raw;

  let s = String(raw);

  // Windows -> web slashes
  s = s.replace(/\\/g, "/");

  // keep only the part after "uploads/"
  const idx = s.toLowerCase().indexOf("uploads/");
  if (idx >= 0) s = s.slice(idx); // "uploads/xxx.ext"

  // strip leading "./" "/" and "public/"
  s = s.replace(/^\.?\/*/, "");
  s = s.replace(/^public\//i, "");

  // ensure it starts with "uploads/"
  if (!/^uploads\//i.test(s)) s = `uploads/${s}`;

  return `http://localhost:5000/${s}`;
}

export default function RequestDetails() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);   // { activity, request }
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [imgOk, setImgOk] = useState(true); // fallback if image fails

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/requests/${requestId}`);
        setData(data);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load request");
      } finally {
        setLoading(false);
      }
    })();
  }, [requestId]);

  const req = data?.request || {};
  const act = data?.activity || {};

  // Try common field names coming back from your backend
  const receiptRaw =
    req.paymentReceipt?.path ??
    req.paymentReceiptPath ??
    req.paymentReceiptUrl ??
    req.paymentReceipt ??
    req.receipt?.path ??
    req.receipt ??
    "";

  const receiptUrl = useMemo(() => buildReceiptUrl(receiptRaw), [receiptRaw]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!data) return <div className="p-6">Not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Request details</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded"
        >
          Back
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Activity summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span className="font-medium">Request ID:</span> {act.requestId}</div>
            <div><span className="font-medium">Type:</span> {act.type}</div>
            <div>
              <span className="font-medium">Submitted:</span>{" "}
              {act.subDate ? new Date(act.subDate).toLocaleString() : "-"}
            </div>
            <div>
              <span className="font-medium">Estimated:</span>{" "}
              {act.estDate ? new Date(act.estDate).toLocaleDateString() : "-"}
            </div>
            <div><span className="font-medium">Status:</span> {act.status}</div>
            <div><span className="font-medium">Description:</span> {act.desc || "-"}</div>
            <div><span className="font-medium">Username:</span> {act.username}</div>
          </div>
        </div>

        {/* Submitted form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            {act.type === "truecopy" ? "True Copy Request" : "Transcript Request"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {!!req.fullName && (
              <div><span className="font-medium">Full Name:</span> {req.fullName}</div>
            )}
            {!!req.address && (
              <div><span className="font-medium">Address:</span> {req.address}</div>
            )}
            {!!req.email && (
              <div><span className="font-medium">Email:</span> {req.email}</div>
            )}
            {!!req.registrationNumber && (
              <div><span className="font-medium">Registration No:</span> {req.registrationNumber}</div>
            )}
            {!!req.yearOfAdmission && (
              <div><span className="font-medium">Year of Admission:</span> {req.yearOfAdmission}</div>
            )}
            {!!req.contactNumber && (
              <div><span className="font-medium">Contact No:</span> {req.contactNumber}</div>
            )}
            {!!req.degreeName && (
              <div><span className="font-medium">Degree:</span> {req.degreeName}</div>
            )}
            {!!req.numberOfCopies && (
              <div><span className="font-medium">No. of Copies:</span> {req.numberOfCopies}</div>
            )}
            {!!req.effectiveDate && (
              <div><span className="font-medium">Effective Date:</span>{" "}
                {new Date(req.effectiveDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Receipt */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Receipt</h3>

            {!receiptUrl ? (
              <div className="text-gray-500 text-sm">No receipt uploaded.</div>
            ) : imgOk && isImage(receiptUrl) ? (
              <div className="border rounded p-3">
                <img
                  src={receiptUrl}
                  alt="Payment receipt"
                  className="max-h-96 object-contain"
                  onError={() => setImgOk(false)}
                />
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 underline text-sm block mt-2"
                >
                  Open full size
                </a>
              </div>
            ) : (
              <a
                href={receiptUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded"
              >
                Open receipt
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
