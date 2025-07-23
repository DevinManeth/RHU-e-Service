import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OngoingActivities from './pages/OngoingActivities.jsx';
import Help from './pages/help.jsx';
import ApplyTranscript from './pages/applyTranscript.jsx';
import Truecopy from './pages/Truecopy.jsx';
import JobOwners from './pages/JobOwners.jsx';
import LoginAs from './pages/LoginAs.jsx';
import Landing from './pages/Landing.jsx';
import DashBoard from "./pages/DashBoard";
import Login from './pages/Login.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<LoginAs />} />
        <Route path='/login/studentlogin' element={<Login />} />
        <Route path="/login/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/help" element={<Help/>} />
        <Route path="/OngoingActivities" element={<OngoingActivities />} />
        <Route path="/ApplyTranscript" element={<ApplyTranscript/>} />
        <Route path="/Truecopy" element={<Truecopy/>} />
        <Route path="/JobOwners" element={<JobOwners/>} />
      </Routes>
    </BrowserRouter>


     
    </>
  )
}

export default App
