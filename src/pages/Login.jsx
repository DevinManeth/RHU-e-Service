import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.jpeg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt with:', { username, password });
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
      <div className="absolute inset-0} bg-opacity-40"></div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-teal-700 bg-opacity-90 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                RUH e-Service
              </h1>
              <nav className="space-x-8">
                <button onClick={() => navigate('/help')} className="text-white hover:text-teal-200 transition-colors">
                  Help Me
                </button>
                <button onClick={() => navigate('/about')} className="text-white hover:text-teal-200 transition-colors">
                  About Us
                </button>
                
              </nav>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
