import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componets/Navbar';

const OngoingActivities = () => {
  // Sample data - this will later come from your backend
  const activities = [
    {
      id: '01',
      submittedDate: '5/9/25',
      description: 'Request transcript',
      estimatedDate: '5/19/25',
      status: 'Processing'
    },
    {
      id: '02',
      submittedDate: '5/1/25',
      description: 'Request Trucopy degree certificate',
      estimatedDate: '5/11/25',
      status: 'Ongoing'
    },
    {
      id: '03',
      submittedDate: '4/28/25',
      description: 'Request Trucopy degree certificate',
      estimatedDate: '5/2/25',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-teal-700 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Ongoing Activities</h1>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estimated date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{activity.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{activity.submittedDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{activity.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{activity.estimatedDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          activity.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {activity.status}
                        {activity.status === 'Completed' && (
                          <button className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        )}
                      </span>
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

export default OngoingActivities;