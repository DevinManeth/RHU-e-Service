import React from "react";
import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function ApplyTranscript() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
            UNIVERSITY OF RUHUNA
          </h2>
          <h3 className="text-lg font-semibold text-center text-gray-700 mb-6">
            APPLICATION FOR ACADEMIC TRANSCRIPT
          </h3>
          <form className="space-y-4">
            <p className="text-xs text-center text-gray-500 mb-2">
              (This is issued only to an institution recognized locally or internationally.)
            </p>

            <label className="block">
              Full name of the Applicant:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Address of the Applicant:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              E-mail address of the Applicant:
              <input type="email" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Registration number:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Year of admission:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Contact number of the Applicant:
              <input type="tel" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Address to which the transcript should be sent:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Name of the degree awarded:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <p className="font-semibold text-gray-700 mt-4">Particulars of the Examinations passed</p>

            <label className="block">
              Index no.:
              <input type="text" className="w-full border rounded p-2 mt-1" />
            </label>

            <label className="block">
              Effective date of the Degree:
              <input type="date" className="w-full border rounded p-2 mt-1" />
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