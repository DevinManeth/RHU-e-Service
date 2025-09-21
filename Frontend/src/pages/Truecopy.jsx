// src/componets/DegreeCertificateRequestForm.jsx
import React, { useState } from 'react';
// import { api } from '../api/axios';

import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const DegreeCertificateRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    faculty: '',
    degreeProgram: '',
    graduationYear: '',
    email: '',
    contact: '',
    numberOfCopies: '',
    degreeCopy: null,       // rename nicCopy -> degreeCopy to match backend
    paymentReceipt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const username = currentUser?.username || "";
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("username", username);
      console.log("Form Data Entries:", ...fd); // Debug log
      const { data } = await api.post('/truecopy/apply', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`Submitted. Request ID: ${data.requestId}`);
      // navigate('/OngoingActivities')
    } catch (err) {
      console.error('Submit error:', err);
      alert(err?.response?.data?.message || 'Submit failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-cyan-900">
          Request true copy of degree certificate
        </h2>

        {/* Required input fields */}
        {[
          ['Full name', 'fullName', 'text'],
          ['Student ID', 'studentId', 'text'],
          ['Faculty', 'faculty', 'text'],
          ['Degree program', 'degreeProgram', 'text'],
          ['Graduation year', 'graduationYear', 'text'],
          ['Email address', 'email', 'email'],
          ['Contact number', 'contact', 'text'],
        ].map(([label, name, type]) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 text-gray-700">{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Number of Copies - Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">How many true copies do you want:</label>
          <select
            name="numberOfCopies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select number of copies --</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* NIC Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Upload Degree certificte copy:</label>
          <input
            type="file"
            name="degreeCopy"
            onChange={handleChange}
            className="w-full"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        {/* Payment Receipt Upload */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Upload payment receipt:</label>
          <input
            type="file"
            name="paymentReceipt"
            onChange={handleChange}
            className="w-full"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-cyan-700 text-white py-2 px-4 rounded hover:bg-cyan-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DegreeCertificateRequestForm;