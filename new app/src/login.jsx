import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   // ✅ Use navigate!

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ ' + data.message);
        navigate('/dashboard');   // ✅ Go to Dashboard on success!
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('🚫 Server error');
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/bg.jpg")',
        }}
      />

      {/* Transparent white overlay */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Login form content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          onSubmit={handleLogin}
          className="bg-transparent p-6 rounded shadow-md flex flex-col space-y-4 w-96"
        >
          <h2 className="text-lg font-bold text-black text-center">Login Page</h2>

          <div>
            <label className="block font-bold text-black mb-1">User name :</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white/80"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-20 text-sm py-1 bg-gray-300 font-bold text-black rounded hover:bg-gray-400 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
