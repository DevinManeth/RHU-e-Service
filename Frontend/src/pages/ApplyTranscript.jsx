
import Navbar from "../componets/Navbar";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
// import { api } from "../api/axios";

import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

function ApplyTranscript() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    email: '',
    registrationNumber: '',
    yearOfAdmission: '',
    contactNumber: '',
    degreeName: '',
    numberOfCopies: '',
    effectiveDate: '',
    paymentReceipt: null,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setForm((p) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const username = currentUser?.username || "";

      const fd = new FormData();
       // append all fields (files and strings)
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      // append the username explicitly (no auth check on server)
      fd.append("username", username);

      console.log("Submitting form data:", ...fd); // Debug log

      const { data } = await api.post('/transcripts/apply', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`Submitted. Request ID: ${data.requestId}`);
      navigate('/OngoingActivities'); // or wherever
    } catch (err) {
      alert(err?.response?.data?.message || 'Submit failed');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
            UNIVERSITY OF RUHUNA
          </h2>
          <h3 className="text-lg font-semibold text-center text-gray-700 mb-6">
            APPLICATION FOR ACADEMIC TRANSCRIPT
          </h3>
          <form className="space-y-4"
                onSubmit={onSubmit}
                encType="multipart/form-data">

            <p className="text-xs text-center text-gray-500 mb-2">
              (This is issued only to an institution recognized locally or internationally.)
            </p>

            <label className="block">
              Full name of the Applicant:
              <input 
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                type="text"
                className="w-full border rounded p-2 mt-1"
                required 
                />
            </label>

            <label className="block">
              Address of the Applicant:
              <input name="address"
                value={form.address}
                onChange={onChange}
                type="text"
                className="w-full border rounded p-2 mt-1"
                required  />
            </label>

            <label className="block">
              E-mail address of the Applicant:
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                className="w-full border rounded p-2 mt-1"
                required
              />
            </label>

            <label className="block">
              Registration number:
              <input 
              name="registrationNumber"
                value={form.registrationNumber}
                onChange={onChange}
                type="text"
                className="w-full border rounded p-2 mt-1"
                required
               />
            </label>

            <label className="block">
              Year of admission:
              <input
                name="yearOfAdmission"
                value={form.yearOfAdmission}
                onChange={onChange}
                type="text"
                className="w-full border rounded p-2 mt-1"
                required
              />
            </label>

            <label className="block">
              Contact number of the Applicant:
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={onChange}
                type="tel"
                className="w-full border rounded p-2 mt-1"
                required
              />
            </label>

            <label className="block">
              Name of the degree awarded:
              <input
                name="degreeName"
                value={form.degreeName}
                onChange={onChange}
                type="text"
                className="w-full border rounded p-2 mt-1"
                required
              />
            </label>

            <label className="block">
              How many transcript copies do you want:
              <select
                name="numberOfCopies"
                value={form.numberOfCopies}
                onChange={onChange}
                className="w-full border rounded p-2 mt-1"
                required
              >
                <option value="">-- Select number of copies --</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              Effective date of the Degree:
              <input
                name="effectiveDate"
                value={form.effectiveDate}
                onChange={onChange}
                type="date"
                className="w-full border rounded p-2 mt-1"
                required
              />
            </label>

            {/* Payment receipt upload */}
            <label className="block">
              Upload payment receipt:
              <input
                name="paymentReceipt"
                onChange={onChange}
                type="file"
                className="w-full border rounded p-2 mt-1"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
            </label>

            <div className="flex justify-between pt-4">
              <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplyTranscript;