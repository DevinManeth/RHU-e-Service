import React from "react";
import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function JobOpportunitiesForm() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Job Opportunities
        </h2>
        <form className="space-y-4">
          <label className="block">
            Full name:
            <input type="text" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Registration number:
            <input type="text" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Graduation year:
            <input type="text" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Faculty:
            <input type="text" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Monthly income:
            <input type="number" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Employment type:
            <input type="text" className="w-full border rounded p-2 mt-1" />
          </label>

          <label className="block">
            Industry:
            <input type="text" className="w-full border rounded p-2 mt-1" />
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

export default DashBoard;