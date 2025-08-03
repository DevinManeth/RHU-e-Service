import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/uni.jpg';

function AdminLogin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add admin authentication logic here
    console.log('Admin login attempt:', { userName, password });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <img
        src={Background}
        alt="University Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40"></div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-teal-700 bg-opacity-90 text-white">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                RUH e-Service
              </h1>
              <nav className="space-x-8">
                <button 
                  onClick={() => navigate('/help')} 
                  className="text-white hover:text-teal-200 transition-colors"
                >
                  Help Me
                </button>
                <button 
                  onClick={() => navigate('/about')} 
                  className="text-white hover:text-teal-200 transition-colors"
                >
                  About Us
                </button>
                
              </nav>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">
              Admin Login Page
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex text-gray-700 text-sm font-medium">
                  User name :
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex text-gray-700 text-sm font-medium">
                  Password :
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button onClick={() => navigate('/admin-dashboard')}
                  type="submit"
                  className="bg-teal-600 text-white px-6 py-2 rounded-md 
                           hover:bg-teal-700 transition-colors duration-200 
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;