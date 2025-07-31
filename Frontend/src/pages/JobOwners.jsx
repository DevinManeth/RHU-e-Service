import React from "react";
import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function JobOpportunitiesForm() {
  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-1/2 shadow-lg rounded-lg p-8">
        <h1 className="text-center text-2xl font-bold mb-6 text-teal-700">
          JOB OPPORTUNITIES
        </h1>
        <form className="space-y-4">
          
          <div>
            <label className="block font-semibold mb-2">NAME</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full border rounded px-3 py-2"
            />
          </div>

      
          <div>
            <label className="block font-semibold mb-2">
              REGISTRATION NUMBER
            </label>
            <input
              type="text"
              placeholder="Enter Registration Number"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">FACULTY</label>
            <input
              type="text"
              placeholder="Enter Faculty"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">GRADUATION YEAR</label>
            <input
              type="text"
              placeholder="Enter Graduation Year"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">CURRENT JOB</label>
            <input
              type="text"
              placeholder="Enter Current Job"
              className="w-full border rounded px-3 py-2"
            />
          </div>

        
          <div>
            <label className="block font-semibold mb-2">GENDER</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="gender" className="mr-2" /> Male
              </label>
              <label>
                <input type="radio" name="gender" className="mr-2" /> Female
              </label>
            </div>
          </div>

          
          <div>
            <label className="block font-semibold mb-2">EMPLOYMENT TYPE</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="employmentType" className="mr-2" /> Full Time
              </label>
              <label>
                <input type="radio" name="employmentType" className="mr-2" /> Part Time
              </label>
            </div>
          </div>

          
          <div>
            <label className="block font-semibold mb-2">MONTHLY INCOME</label>
            <select className="w-full border rounded px-3 py-2">
              <option value="0-50000">0-50000</option>
              <option value="50000-100000">50000-100000</option>
              <option value="100000-150000">100000-150000</option>
              <option value="150000-200000">150000-200000</option>
              <option value="Above 200000">Above 200000</option>
            </select>
          </div>

    
          <div>
            <label className="block font-semibold mb-2">INDUSTRY</label>
            <select className="w-full border rounded px-3 py-2">
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

function DashBoard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* Chatbot image if needed */}
      
      <JobOpportunitiesForm />
    </>
  );
}

export default JobOpportunitiesForm;