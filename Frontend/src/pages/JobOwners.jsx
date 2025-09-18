import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function JobOpportunitiesForm() {

  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    faculty: "",
    graduationYear: "",
    currentJob: "",
    gender: "",
    employmentType: "",
    monthlyIncome: "",
    industry: ""
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/jobowners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-1/2 shadow-lg rounded-lg p-8">
        <h1 className="text-center text-2xl font-bold mb-6 text-teal-700">
          JOB OPPORTUNITIES
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block font-semibold mb-2">NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

      
          <div>
            <label className="block font-semibold mb-2">
              REGISTRATION NUMBER
            </label>
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">FACULTY</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">GRADUATION YEAR</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">CURRENT JOB</label>
            <input
              type="text"
              name="currentJob"
              value={formData.currentJob}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

        
          <div>
            <label className="block font-semibold mb-2">GENDER</label>
            <div className="flex gap-4">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Male"
                  onChange={handleChange} />{" "} Male
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Female"
                  onChange={handleChange} />{" "} Female
              </label>
            </div>
          </div>

          
          <div>
            <label className="block font-semibold mb-2">EMPLOYMENT TYPE</label>
            <div className="flex gap-4">
              <label>
                <input 
                  type="radio" 
                  name="employmentType" 
                  value="Full Time"
                  onChange={handleChange} />{" "} Full Time
              </label>
              <label>
                <input 
                  type="radio" 
                  name="employmentType" 
                  value="Part Time"
                  onChange={handleChange} />{" "} Part Time
              </label>
            </div>
          </div>

          
          <div>
            <label className="block font-semibold mb-2">MONTHLY INCOME</label>
            <select 
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2">
              <option value="0-50000">0-50000</option>
              <option value="50000-100000">50000-100000</option>
              <option value="100000-150000">100000-150000</option>
              <option value="150000-200000">150000-200000</option>
              <option value="Above 200000">Above 200000</option>
            </select>
          </div>

    
          <div>
            <label className="block font-semibold mb-2">INDUSTRY</label>
            <select 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2">
              <option value="it">IT</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="media">Media</option>
              <option value="hospitality and tourism">Hospitality and Tourism</option>
              <option value="other">Other</option>
            </select>
          </div>

          
          <div className="flex justify-between">
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

// function DashBoard() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Navbar />
//       {/* Chatbot image if needed */}
      
//       <JobOpportunitiesForm />
//     </>
//   );
// }

export default JobOpportunitiesForm;