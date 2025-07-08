import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Top bar */}
      <div
        className="text-white p-4 flex justify-between items-center"
        style={{ backgroundColor: '#006A71' }}
      >
        <h1 className="text-xl font-bold">RUH e-Service</h1>
        <div className="space-x-4">
          <button className="hover:underline">Help Me</button>
          <button className="hover:underline">About Us</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        

        <div className="flex flex-col space-y-4 w-full md:w-1/4 " >
          <button
            className="px-6 py-3 rounded shadow hover:opacity-90 font-bold mb-[1.5cm]"
            style={{ backgroundColor: '#9ACBD0' }}
          >
            New Requests 💬
          </button>

          <button
            className="px-6 py-3 rounded shadow hover:opacity-90 font-bold mb-[1.5cm]"
            style={{ backgroundColor: '#9ACBD0' }}
          >
            Process
          </button>

          <button
            className="px-6 py-3 rounded shadow hover:opacity-90 font-bold mb-[1.5cm]"
            style={{ backgroundColor: '#9ACBD0' }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
