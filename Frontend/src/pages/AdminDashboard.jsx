import React from "react";
import { MessageCircle } from "lucide-react"; // Notification icon
import Background from '../assets/adminBackground.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    
    <div className="min-h-screen relative bg-gray-200">

            {/* Background Image */}
            <img
              src={Background}
              alt="University Campus"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
           {/* Content */}
      <div className="relative z-10"> 

      {/* Header */}
      <header className="bg-teal-800 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold ">RUH e-Service</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:cursor-pointer">Help Me</a>
          <a href="#" className="hover:cursor-pointer">About Us</a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-start space-y-6 px-20 py-16">
        {/* New Requests */}
        <div className="relative">
          <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow"
            onClick={() => navigate('/newRequest')}>
            New Requests
          </button>
          {/* Notification Icon */}
          <div className="absolute -top-1 -right-3 flex items-center space-x-1">
            {/* <MessageCircle className="h-6 w-6 text-white bg-pink-600 rounded-full p-1" /> */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              4
            </span>
          </div>
        </div>

        {/* Process */}
        <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow">
          Process
        </button>

        {/* Finish */}
        <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow">
          Finish
        </button>
      </main>
    </div>
  </div>
  );
};

export default AdminDashboard;