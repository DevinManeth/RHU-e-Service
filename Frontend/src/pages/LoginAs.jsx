import background from '../assets/background.jpeg';
import {useNavigate} from 'react-router-dom';

function LoginAs() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Top Navbar */}
      <div className="bg-teal-800 text-white flex justify-between items-center px-6 py-7">
        <h1 className="text-lg font-bold">RUH e-Service</h1>
        <div className="space-x-6 text-sm">
          <a href="#">Help Me</a>
          <a href="#">About US</a>
          <a href="#">Login</a>
        </div>
      </div>

      {/* Login Options */}
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 backdrop-blur-sm">
        <LoginCard
          title="Login as a Student"
          icon="🎓"
          onClick={() => navigate("/login")}
        />
        <LoginCard
          title="Login as a Administrator"
          icon="⚙️"
          onClick={() => navigate("/admin-login")}
        />
      </div>
    </div>
  )
}

function LoginCard({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/90 hover:scale-105 cursor-pointer transition-transform w-60 h-60 shadow-lg rounded-xl flex flex-col items-center justify-center text-center p-6"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>
  )
}

export default LoginAs;