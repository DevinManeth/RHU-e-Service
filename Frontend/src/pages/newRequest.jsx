import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componets/Navbar';

const NewRequest = () => {
  const navigate = useNavigate();

  // Sample data - will be replaced with backend data later
  const requests = [
    {
      id: '01',
      submittedDate: '4/28/25',
      description: 'Request Trucopy degree certificate',
    },
    {
      id: '02',
      submittedDate: '5/1/25',
      description: 'Request Trucopy degree certificate',
    },
    {
      id: '03',
      submittedDate: '5/9/25',
      description: 'Request transcript',
    },
  ];

  const handleViewForm = (id) => {
    // Will handle viewing the form
    console.log('Viewing form for request:', id);
  };

  const handleProcess = (id) => {
    // Will handle processing the request
    console.log('Processing request:', id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-800 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold ">RUH e-Service</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:cursor-pointer">Help Me</a>
          <a href="#" className="hover:cursor-pointer">About Us</a>
        </nav>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-teal-700 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Requests</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NO.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">submitted date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">View</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Click</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{request.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{request.submittedDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{request.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewForm(request.id)}
                        className="bg-teal-100 text-teal-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-200 transition-colors"
                      >
                        view form
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleProcess(request.id)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;