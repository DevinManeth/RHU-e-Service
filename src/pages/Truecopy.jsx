// src/components/DegreeCertificateRequestForm.jsx
import React, { useState } from 'react';

const DegreeCertificateRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    faculty: '',
    degreeProgram: '',
    graduationYear: '',
    email: '',
    contact: '',
    numberOfCopies: '1',
    nicCopy: null,
    paymentReceipt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manual validation for file fields
    if (!formData.nicCopy || !formData.paymentReceipt) {
      alert('Please upload both NIC copy and payment receipt.');
      return;
    }

    // Check all other required fields
    const requiredFields = [
      'fullName',
      'studentId',
      'faculty',
      'degreeProgram',
      'graduationYear',
      'email',
      'contact',
      'numberOfCopies',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field.replace(/([A-Z])/g, ' $1')}.`);
        return;
      }
    }

    // Submit form data
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    console.log('Form submitted:', formData);
    // Submit logic (e.g., axios.post) goes here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-cyan-900">
          Request true copy of degree certificate
        </h2>

        {/* Text Inputs */}
        {[
          ['Full name', 'fullName'],
          ['Student ID', 'studentId'],
          ['Faculty', 'faculty'],
          ['Degree program', 'degreeProgram'],
          ['Graduation year', 'graduationYear'],
          ['Email address', 'email'],
          ['Contact number', 'contact'],
        ].map(([label, name]) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 text-gray-700">{label}:</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Select Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">
            How many true copies do you want:
          </label>
          <select
            name="numberOfCopies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* NIC Copy Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Upload NIC copy:</label>
          <input
            type="file"
            name="nicCopy"
            onChange={handleChange}
            className="w-full"
            accept=".jpg,.jpeg,.png,.pdf"
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
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
        </div>

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